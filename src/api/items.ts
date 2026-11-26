import type { Item } from "@/types/item";

/**
 * Base URL of MockAPI from the .env.local file
 */

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Product data without id
 * Used when adding a new product because MockAPI makes the id itself
 */

export type NewItem = Omit<Item, "id">;

/**
 * Gets all products from MockAPI with a GET request
 * Used by useQuery in useInventory
 * Throws an error if the request fails
 */

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${apiUrl}/items`);

  if (!response.ok) {
    throw new Error("Failed to load items");
  }

  return response.json();
};

/**
 * Deletes one product  in MockAPI with a DELETE request
 * Used by deleteMutation in useInventory
 * Throws an error if the request fails
 */

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
};

/**
 * Saves an edited product on MockAPI with a PUT request
 * The product is turned into JSON text
 * Used by updateMutation in useInventory
 * Returns the updated product from MockAPI
 */

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

/**
 * Adds a new product on MockAPI with a POST request
 * The product is turned into JSON text and sent in the body
 * Used by addMutation in useInventory
 * Returns the new product with the id made by MockAPI
 */

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