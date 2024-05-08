import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import recipeShape from "./recipeShape";
import styles from "../styles/Editor.module.css";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction, currentRecipe }) {
  const [formData, setFormData] = useState({
    title: "",
    servings: 0.0,
    prepSteps: "",
    isPublic: false,
    author: 2,
    ingredients: [{ name: "", quantity: 0.0, unit: "", indexInRecipe: 0 }],
  });

  // Update form data with currentRecipe on component mount
  useEffect(() => {
    if (currentRecipe) {
      setFormData(currentRecipe);
    }
  }, [currentRecipe]);

  const { title, servings, prepSteps, author, isPublic } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newRecipe = {
      title,
      servings,
      prepSteps,
      isPublic,
      author,
      ingredients: formData.ingredients,
      edited: currentDate,
    };
    await completeFunction(newRecipe);
    // Reset the form data after submission
    setFormData({
      title: "",
      servings: 0.0,
      prepSteps: "",
      isPublic: false,
      author: 2,
      ingredients: [{ name: "", quantity: 0.0, unit: "", indexInRecipe: 0 }],
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.editor}>
        <input
          type="text"
          placeholder="Title must be set"
          name="title"
          value={title}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Servings"
          name="servings"
          value={servings}
          onChange={onChange}
        />
        <IngredientsBar
          ingredients={formData.ingredients}
          setIngredients={(ingredients) =>
            setFormData((prevState) => ({ ...prevState, ingredients }))
          }
        />
        <textarea
          type="text"
          placeholder="Preparation Steps"
          name="prepSteps"
          value={prepSteps}
          onChange={onChange}
        />
        <label>
          Public:
          <input
            type="checkbox"
            checked={isPublic}
            name="isPublic"
            onChange={() =>
              setFormData((prevState) => ({
                ...prevState,
                isPublic: !isPublic,
              }))
            }
          />
        </label>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

RecipeCreator.propTypes = {
  completeFunction: PropTypes.func.isRequired,
  currentRecipe: recipeShape,
};
