import type { Recipe } from "@/types/map";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="p-2.5 tek-glass">
      <div className="text-sm font-semibold text-ark-element font-body">
        {recipe.name}
      </div>
      <div className="text-xs text-ark-text-dim mt-1 font-mono">
        {recipe.ingredients}
      </div>
      <div className="text-xs text-ark-text mt-2 leading-relaxed font-body">
        {recipe.use}
      </div>
    </div>
  );
}
