/*
  recipeCreator.js

  This provides a basic editor with space for entering a recipe

  The interface has two buttons. If "Cancel" is clicked, the `complete` callback
  is called with no arguments. If the "Save" button is clicked, the `complete` callback
  is called with a new article object with `title`, `servings`, 'ingredients', 'prepSteps', 'isPublic', and `date`. 

  If the optional `recipe` prop is set, the `title`, 'servings', 'ingredients`, 'prepSteps', and 'isPublic' fields of the component
  are pre-loaded with the values. In addition, all other properties of the object are 
  included in the returned recipe object. 

  props:
    currentRecipe -
    complete - function to call on completion (required)
*/

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import recipeShape from "./recipeShape";
import styles from "../styles/Editor.module.css";
// import styles from "../styles/Editor.module.css";

export default function RecipeCreator({ currentRecipe, completeFunction }) {
    const [title, setTitle] = useState("");
    const [servings, setServings] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prepSteps, setPrepSteps] = useState("");
    const [isPublic, setPublic] = useState("");
    

    useEffect(() => {
        if (currentRecipe) {
          setTitle(currentRecipe.title || "");
          setServings(currentRecipe.servings || "");
          setIngredients(currentRecipe.ingredients || "");
          setPrepSteps(currentRecipe.prepSteps || "");
          setPublic(currentRecipe.isPublic || "");
        } else {
          setTitle("");
          setServings("");
          setIngredients("");
          setPrepSteps("");
          setPublic("");
        }
      }, [currentRecipe]);

      function handleSaveClick() {
        const currentDate = new Date().toISOString();
        const newRecipe = {
          title,
          servings,
          ingredients,
          prepSteps,
          isPublic,
          edited: currentDate,
        };
      
        if (currentRecipe) {
          newRecipe.id = currentRecipe.id;
        }
        completeFunction(newRecipe);
      }

      function handleCancelClick(){
        completeFunction();
      }

      return (
        <div className={styles.editor}>
          <input 
            type="text"
            placeholder="Title must be set"
            value={title}
            onChange={(event) => setTitle(event.target.value)} 
          />
          <input 
            type="text"
            placeholder="Servings"
            value={servings}
            onChange={(event) => setServings(event.target.value)} 
          />
          <textarea 
            type="text" 
            placeholder="Ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)} 
          />
          <textarea 
            type="text" 
            placeholder="Preparation Steps"
            value={prepSteps}
            onChange={(event) => setPrepSteps(event.target.value)} 
          />
          <label>
            Public:
            <input 
              type="checkbox"
              checked={isPublic}
              onChange={(event) => setPublic(event.target.checked)} 
            />
          </label>
          <button type="button" disabled={title === ""} onClick={handleSaveClick}>Save</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      );
}

RecipeCreator.propTypes = {
    currentRecipe: recipeShape,
    completeFunction: PropTypes.func.isRequired,
  };