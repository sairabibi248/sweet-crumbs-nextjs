import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, deleteItem, createItem, updateItem, type NewItem } from "@/api/items";
import type { Item } from "@/types/item";

export const lowStockLimit = 5;

export const useInventory = () => {
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [items, searchTerm, activeCategory]);

  const stats = useMemo(() => {
    return {
      totalProducts: items.length,
      inStock: items.filter((item) => item.quantity >= lowStockLimit).length,
      lowStock: items.filter((item) => item.quantity > 0 && item.quantity < lowStockLimit).length,
      soldOut: items.filter((item) => item.quantity === 0).length,
    };
  }, [items]);

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: updateItem,

    onMutate: async (updatedItem: Item) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });

      queryClient.setQueryData<Item[]>(["items"], (oldItems) => {
        if (!oldItems) return [];

        return oldItems.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        });
      });
    },

    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ["updateItem"] }) === 1) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });

  const changeQuantity = (item: Item, amount: number) => {
    const newQuantity = Math.max(0, item.quantity + amount);
    updateMutation.mutate({ ...item, quantity: newQuantity });
  };

  return {
    items: filteredItems,
    stats,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    deleteItem: (id: string) => deleteMutation.mutate(id),
    addItem: (newItem: NewItem) => addMutation.mutate(newItem),
    updateItem: (item: Item) => updateMutation.mutate(item),
    changeQuantity,
  };
};