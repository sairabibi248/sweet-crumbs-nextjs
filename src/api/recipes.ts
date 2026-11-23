import type { RecipeSummary, RecipeDetail } from "@/types/recipe";

const mealApiUrl = process.env.MEAL_API_URL;

type RecipesResponse = {
  meals: RecipeSummary[] | null;
};

type RecipeDetailResponse = {
  meals: RecipeDetail[] | null;
};

export const getDesserts = async (): Promise<RecipeSummary[]> => {
  const response = await fetch(`${mealApiUrl}/filter.php?c=Dessert`);

  if (!response.ok) {
    throw new Error("Failed to fetch desserts");
  }

  const data: RecipesResponse = await response.json();
  return data.meals ?? [];
};

export const getRecipeById = async (id: string): Promise<RecipeDetail | null> => {
  const response = await fetch(`${mealApiUrl}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: RecipeDetailResponse = await response.json();
  return data.meals ? data.meals[0] : null;
};