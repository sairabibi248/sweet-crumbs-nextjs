import Image from "next/image";
import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";

type RecipeCardProps = {
  recipe: RecipeSummary;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="group flex h-full flex-col rounded-2xl bg-[#fcf8f2] p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={300}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-3 min-h-10 text-sm font-semibold text-[#4a2c11]">
        {recipe.strMeal}
      </h3>

      <Link
        href={`/recipes/${recipe.idMeal}`}
        className="mt-auto w-full rounded-lg bg-[#efeafa] py-2 text-center text-sm font-medium text-[#5b4691] hover:bg-[#6f58a8] hover:text-white"
      >
        View recipe
      </Link>
    </div>
  );
};

export default RecipeCard;