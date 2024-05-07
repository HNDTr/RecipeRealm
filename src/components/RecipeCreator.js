import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Editor.module.css";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction }) {
  const [formData, setFormData] = useState({
    title: "",
    servings: 0.0,
    prepSteps: "",
    isPublic: false,
    author: 2,
    ingredients: [{ name: "", quantity: 0.0, unit: "", indexInRecipe: 0 }],
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "", indexInRecipe: 0 },
  ]);

  const { title, servings, prepSteps, author, isPublic } = formData;

  const onChange = (e) => {
    // console.log("Before state update:", formData); // Add this line
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log("After state update:", formData); // Add this line
  };

  // const onIngredientChange = (index, e) => {
  //   const updatedIngredients = [...ingredients];
  //   updatedIngredients[index][e.target.name] = e.target.value;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     ingredients: updatedIngredients,
  //   }));
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newRecipe = {
      title,
      servings,
      prepSteps,
      isPublic,
      author,
      ingredients,
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
          ingredients={ingredients}
          setIngredients={setIngredients}
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
};
