import { useRouter } from "next/router";
import recipeShape from "@/components/recipeShape";
// import PropTypes from "prop-types";
import RecipeCreator from "../../../components/RecipeCreator";

export default function Editor(selectedRecipe) {
  const router = useRouter();

  const completeFunction = async (recipe) => {
    if (recipe) {
      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: "PUT",
        body: JSON.stringify(recipe),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        // eslint-disable-next-line no-console
        console.log(recipe);
        // const returnRecipe = await response.json();
        // pushCurrentRecipe(returnRecipe);
      }
    } else {
      router.back();
    }
  };

  return (
    <RecipeCreator 
    selectedRecipe={selectedRecipe}
    completeFunction={(recipe) => completeFunction(recipe)}
    // key={currentRecipe?.id}
    />
  );
}

 Editor.propTypes = {
    // eslint-disable-next-line
     selectedRecipe: recipeShape,
     };