import React from "react";
import { PropTypes } from "prop-types";
import ingredientShape from "./ingredientShape";

/* eslint-disable no-console */ // for debugging purposes

function IngredientsBar({ ingredients, setIngredients }) {
  // TODO add deleteIngredient function
  // const units = [
  //   "cups",
  //   "ml",
  //   "tsp",
  //   "tbsp",
  //   "grams",
  //   "oz (volume)",
  //   "oz (weight)",
  //   "lbs",
  //   "pinch",
  // ]; // List of common units

  function deleteIngredient(indexInRecipeOfIngredient) {
    //  console.log(indexInRecipeOfIngredient);
    console.log("Ingredients length before deleting", ingredients.length);
    const updatedIngredients = [...ingredients];
    const newlyUpdatedIngredients = updatedIngredients.filter(
      (element) => element.indexInRecipe !== indexInRecipeOfIngredient,
    );
    console.log(
      "Newly updated Ingredients length after deleting",
      newlyUpdatedIngredients.length,
    );
    setIngredients(newlyUpdatedIngredients);
  }

  // Function to add a new blank ingredient field
  function addIngredient() {
    console.log("Ingredients length before adding", ingredients.length);
    setIngredients([
      ...ingredients,
      { name: "", quantity: 0.0, unit: "", indexInRecipe: ingredients.length },
    ]);
    console.log("Ingredients length after adding", ingredients.length);
  }

  return (
    <div>
      {ingredients.map((element) => (
        <div key={element.indexInRecipe}>
          <input type="text" placeholder="Ingredient" />
          <input type="number" step="any" placeholder="Quantity" />
          {/* <select>
            {units.map((unit) => (
              <option key={unit + indexInRecipe} value={unit}>
                {unit}
              </option>
            ))}
          </select> */}
          <button
            type="button"
            onClick={() => deleteIngredient(element.indexInRecipe)}
            // onClick={deleteIngredient(index)}
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
