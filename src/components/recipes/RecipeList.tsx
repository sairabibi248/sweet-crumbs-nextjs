"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/recipes/RecipeCard";
import type { RecipeSummary } from "@/types/recipe";

type RecipeListProps = {
  recipes: RecipeSummary[];
};

const RecipeList = ({ recipes }: RecipeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-semibold">{filteredRecipes.length} recipes</p>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search desserts..."
          className="w-72 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <p className="text-center text-sm text-[#6b7280]">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;