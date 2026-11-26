import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/api/recipes";
import type { RecipeDetail } from "@/types/recipe";


type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const getIngredients = (recipe: RecipeDetail) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }

  return ingredients;
};



export default async function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <Link href="/recipes" className="text-sm font-medium text-[#C2416C] hover:underline">
        Back to recipes
      </Link>

      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={800}
        height={500}
        className="h-72 w-full rounded-xl object-cover"
      />

      <div>
        <h2 className="text-2xl font-bold text-[#4a2c11] dark:text-[#F4F4F5]">{recipe.strMeal}</h2>
        <p className="text-sm text-[#7a5c43]">{recipe.strArea} dessert</p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-[#4a2c11] dark:text-[#F4F4F5]">Ingredients</h3>
        <ul className="list-disc pl-5 text-sm">
          {getIngredients(recipe).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-[#4a2c11] dark:text-[#F4F4F5]">Instructions</h3>
        <p className="whitespace-pre-line text-sm">{recipe.strInstructions}</p>
      </div>
    </div>
  );
}