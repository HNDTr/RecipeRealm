import React from 'react';
import {PropTypes} from "prop-types";
import ingredientShape from './ingredientShape';
// import RecipeCreator from './RecipeCreator';

function IngredientBar({ingredients, setIngredients}) {
  const units = ['cups', 'ml', 'tsp', 'tbsp', 'grams', 'oz (volume)', 'oz (weight)', 'lbs', 'pinch']; // List of common units

  function deleteIngredient(index) {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(updatedIngredients);
  }

  return (
    <div>
      <input type="text" placeholder="Ingredient" />
      <input type="number" step="any" placeholder="Quantity" />
      <select>
        {units.map(unit => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <button type="button" 
      onClick={() => deleteIngredient()}
      > Delete Ingredient </button>
    </div>
  );
};

export default IngredientBar;

IngredientBar.propTypes = {
     ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
     setIngredients: PropTypes.func.isRequired,
}