import React from "react";
import { PropTypes } from "prop-types";
import ingredientShape from "./ingredientShape";

function IngredientsBar({ ingredients, setIngredients }) {
  // TODO add deleteIngredient function
  const units = [
    "cups",
    "ml",
    "tsp",
    "tbsp",
    "grams",
    "oz (volume)",
    "oz (weight)",
    "lbs",
    "pinch",
  ]; // List of common units

  function deleteIngredient(indexOfIngredient) {
    console.log(indexOfIngredient);
    console.log(ingredients);
    const updatedIngredients = [...ingredients];
    const newlyUpdatedIngredients = updatedIngredients.filter(
      (element, index) => index !== indexOfIngredient,
    );
    setIngredients(newlyUpdatedIngredients);
  }

  // Function to add a new blank ingredient field
  function addIngredient() {
    setIngredients([...ingredients, { name: "", quantity: 0.0, unit: "" }]);
  }

  return (
    <div>
      {ingredients.map((element, index) => (
        <div key={element.name}>
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
            onClick={() => deleteIngredient(index)}
            // onClick={deleteIngredient(index)}
          >
            {" "}
            Delete Ingredient{" "}
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
