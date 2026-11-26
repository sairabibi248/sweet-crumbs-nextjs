import type { RecipeSummary, RecipeDetail } from "@/types/recipe";

/**
 * Base URL of TheMealDB from the .env.local file
 * No NEXT_PUBLIC because recipes are fetched on the server only
 */
const mealApiUrl = process.env.MEAL_API_URL;

/**
 * Shape of the list response from TheMealDB
 * meals is null when nothing is found
 */
type RecipesResponse = {
  meals: RecipeSummary[] | null;
};

/**
 * Shape of the single recipe response from TheMealDB
 * meals is null when the id is wrong
 */
type RecipeDetailResponse = {
  meals: RecipeDetail[] | null;
};

/**
 * Gets all dessert recipes from TheMealDB
 * Throws an error if the request fails and error.tsx shows it
 */

export const getDesserts = async (): Promise<RecipeSummary[]> => {
  const response = await fetch(`${mealApiUrl}/filter.php?c=Dessert`);

  if (!response.ok) {
    throw new Error("Failed to fetch desserts");
  }

  const data: RecipesResponse = await response.json();
  return data.meals ?? [];
};

/**
 * Gets one full recipe by its id from TheMealDB
 * Used on the recipe details page in recipes[id]
 * Returns the first recipe from the array or null if not found
 */

export const getRecipeById = async (id: string): Promise<RecipeDetail | null> => {
  const response = await fetch(`${mealApiUrl}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: RecipeDetailResponse = await response.json();
  return data.meals ? data.meals[0] : null;
};