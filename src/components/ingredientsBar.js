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

  function updateIngredientName(newName, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, name: newName };
      }
      return element;
    });
    setIngredients(newlyUpdatedIngredients);
  }

  function updateIngredientQuantity(newQuantity, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, quantity: newQuantity };
      }
      return element;
    });
    setIngredients(newlyUpdatedIngredients);
  }

  function updateIngredientUnit(newUnit, indexInRecipeOfIngredient) {
    const newlyUpdatedIngredients = ingredients.map((element) => {
      if (element.indexInRecipe === indexInRecipeOfIngredient) {
        return { ...element, unit: newUnit };
      }
      return element;
    });
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
      { name: "", quantity: 0.0, unit: "cups", indexInRecipe: nextIndex + 1 },
    ]);
  }

  return (
    <div>
      {ingredients.map((element) => (
        <div key={element.indexInRecipe}>
          <input
            type="text"
            placeholder="Ingredient"
            onChange={(event) =>
              updateIngredientName(event.target.value, element.indexInRecipe)
            }
          />
          <input
            type="number"
            step="any"
            placeholder="Quantity"
            onChange={(event) =>
              updateIngredientQuantity(
                event.target.value,
                element.indexInRecipe,
              )
            }
          />
          <select
            onChange={(event) =>
              updateIngredientUnit(event.target.value, element.indexInRecipe)
            }
            data-testid="unitType"
          >
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

// <input type="text" placeholder="Ingredient"/>
