import type { Item } from "@/types/item";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type NewItem = Omit<Item, "id">;

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${apiUrl}/items`);

  if (!response.ok) {
    throw new Error("Failed to load items");
  }

  return response.json();
};

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
};

export const updateItem = async (item: Item): Promise<Item> => {
  const response = await fetch(`${apiUrl}/items/${item.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  return response.json();
};

export const createItem = async (newItem: NewItem): Promise<Item> => {
  const response = await fetch(`${apiUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    throw new Error("Failed to add item");
  }

  return response.json();
};