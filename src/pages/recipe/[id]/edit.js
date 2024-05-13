import { useRouter } from "next/router";
import propTypes from "prop-types";
import RecipeCreator from "../../../components/RecipeCreator";

export default function Editor({ selectedRecipe }) {
  const router = useRouter();
  const ingredients = JSON.parse(router.query.ingredients || "[]");
  const tags = JSON.parse(router.query.tags || "[]");

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
        // Handle successful response if needed
      }
    } else {
      router.back();
    }
  };

  return (
    <RecipeCreator 
      selectedRecipe={{ ...selectedRecipe, ingredients, tags}}
      completeFunction={(recipe) => completeFunction(recipe)}
    />
  );
}

// PropTypes for type checking
Editor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedRecipe: propTypes.object,
};