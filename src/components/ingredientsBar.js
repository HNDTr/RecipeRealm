import React from "react";
import { PropTypes } from "prop-types";
import ingredientShape from "./ingredientShape";

function IngredientsBar({ ingredients, setIngredients }) {
  const units = [
    // List of common units for ingredients
    "cups",
    "ml",
    "tsp",
    "tbsp",
    "grams",
    "oz (volume)",
    "oz (weight)",
    "lbs",
    "pinch",
  ];

  function deleteIngredient(indexInRecipeOfIngredient) {
    let newlyUpdatedIngredients = [...ingredients];
    newlyUpdatedIngredients = newlyUpdatedIngredients.filter(
      (element) => element.indexInRecipe !== indexInRecipeOfIngredient,
    );
    setIngredients(newlyUpdatedIngredients);
  }

  // Function to add a new blank ingredient field
  function addIngredient() {
    const nextIndex = ingredients.reduce((maxIndex, element) => {
      if (element.indexInRecipe > maxIndex) {
        return element.indexInRecipe;
      }
      return maxIndex;
    }, 0);
    setIngredients([
      ...ingredients,
      { name: "", quantity: 0.0, unit: "", indexInRecipe: nextIndex + 1 },
    ]);
  }

  return (
    <div>
      {ingredients.map((element) => (
        <div key={element.indexInRecipe}>
          <input type="text" placeholder="Ingredient" />
          <input type="number" step="any" placeholder="Quantity" />
          <select>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => deleteIngredient(element.indexInRecipe)}
          >
            Delete Ingredient
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
    </div>
  );
}

export default IngredientsBar;

IngredientsBar.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
  setIngredients: PropTypes.func.isRequired,
};
