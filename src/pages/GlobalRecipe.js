import Searching from "../components/Searching";
import RecipeTitles from "@/components/RecipeTitles";

function GlobalRecipe() {
  const handleRecipeClick = (recipe) => {
    console.log("Recipe clicked:", recipe);
  };

  return (
    <div>
      <Searching />
      <RecipeTitles onRecipeClick={handleRecipeClick} />
    </div>
  );
}

export default GlobalRecipe;
