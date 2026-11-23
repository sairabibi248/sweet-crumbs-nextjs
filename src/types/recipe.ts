export type RecipeSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null;
};