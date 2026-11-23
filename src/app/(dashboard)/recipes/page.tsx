import { getDesserts } from "@/api/recipes";
import RecipeList from "@/components/recipes/RecipeList";

export default async function RecipesPage() {
  const recipes = await getDesserts();

  return <RecipeList recipes={recipes} />;
}