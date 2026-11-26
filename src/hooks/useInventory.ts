import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getItems,deleteItem,createItem,updateItem, type NewItem,} from "@/api/items";
import type { Item } from "@/types/item";

/**
 * Stock limit for a product
 * A product with quantity below this number shows the Low Stock label
 * Used here in stats and in ProductCard
 */

export const lowStockLimit = 5;

/**
 * Custom hook for all inventory data and actions
 * Data comes from MockAPI through the functions 
 * Used on the Inventory page and the Overview page
 */

export const useInventory = () => {
  /** TanStack cache box that stores the products list */
  const queryClient = useQueryClient();

  /**
   * Gets all products from MockAPI using getItems
   * items is an empty array until the data comes
   * isLoading is true while data is loading
   * isError is true if the request fails
   */

  const {
    data: items = [],isLoading,isError,} = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  /** Text typed in the SearchBar on the Inventory page */
  const [searchTerm, setSearchTerm] = useState("");

  /** Category picked by the user and All shows every product */
  const [activeCategory, setActiveCategory] = useState("All");

  /**
   * Products after search and category filter
   * It runs again only when items or searchTerm or activeCategory change
   * Sent to the Inventory page as items
   * search bar 
   */

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [items, searchTerm, activeCategory]);

  /**
   * Counts for the four cards on the Overview page
   * It runs again only when items change
   * overview page 
   */

  const stats = useMemo(() => {
    return {
      
      totalProducts: items.length,
      inStock: items.filter((item) => item.quantity >= lowStockLimit).length,
      lowStock: items.filter( (item) => item.quantity > 0 && item.quantity < lowStockLimit,).length,
      soldOut: items.filter((item) => item.quantity === 0).length,
    };
  }, [items]);

  /**
   * Deletes a product on MockAPI using deleteItem
   * After success it loads the products list again
   * Mutations
   */

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  /**
   * Adds a new product on MockAPI using createItem
   * After success it loads the products list again
   */

  const addMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  /**
   * Updates a product on MockAPI using updateItem
   * The screen changes at once before the server replies
   * optimistic update
   */
  const updateMutation = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: updateItem,

    /** Runs before the request and puts the new product in the cache at once */
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

    /**
     * Runs after the request ends
     * It loads the list again only after the last update
     * This stops the number from jumping when the user clicks fast
     */

    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ["updateItem"] }) === 1) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });

  /**
   * Adds or removes quantity of a product
   * Used by the plus and minus buttons in ProductCard
   * Quantity never goes below 0
   * +/- Quantity Buttons
   */

  const changeQuantity = (item: Item, amount: number) => {
    const newQuantity = Math.max(0, item.quantity + amount);
    updateMutation.mutate({ ...item, quantity: newQuantity });
  };

  return {
    /** Filtered products shown on the Inventory page */
    items: filteredItems,
    /** Counts shown in the cards on the Overview page */
    stats,
    /** True while products are loading from MockAPI */
    isLoading,
    /** True if loading products from MockAPI fails */
    isError,
    /** Current search text from the SearchBar */
    searchTerm,
    /** Changes the search text and is called by the SearchBar */
    setSearchTerm,
    /** Category that is picked right now */
    activeCategory,
    /** Changes the picked category */
    setActiveCategory,
    /** Deletes a product and is called from the Inventory page after ConfirmDialog */
    deleteItem: (id: string) => deleteMutation.mutate(id),
    /** Adds a new product and is called when ItemForm is submitted in add mode */
    addItem: (newItem: NewItem) => addMutation.mutate(newItem),
    /** Saves an edited product and is called when ItemForm is submitted in edit mode */
    updateItem: (item: Item) => updateMutation.mutate(item),
    /** Adds or removes quantity and is used by ProductCard buttons */
    changeQuantity,
  };
};