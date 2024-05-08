import { useState } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, InputLabel } from "@mui/material";
import styles from "../styles/Editor.module.css";
import FilterOptions from "./FilterOptions";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction }) {
  const [formData, setFormData] = useState({
    title: "",
    servings: 0.0,
    prepSteps: "",
    isPublic: false,
    author: 2,
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "", indexInRecipe: 0 },
  ]);

  /* eslint-disable no-unused-vars */
  const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
  const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] =
    useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState([]);
  /* eslint-disable no-unused-vars */

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
    <Grid container spacing={2} className={styles.editor}>
      <Grid item>
        <TextField
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          type="text"
          placeholder="Servings"
          value={servings}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <IngredientsBar
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </Grid>
      <Grid item>
        <TextField
          type="text"
          placeholder="Preparation Steps"
          value={prepSteps}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <InputLabel>
          Public:
          <input
            type="checkbox"
            checked={isPublic}
              name="isPublic"
              data-testid="publicCheckbox"
              onChange={() =>
              setFormData((prevState) => ({
                ...prevState,
                isPublic: !isPublic,
              }))
            }
          />
        </InputLabel>
      </Grid>
      <FilterOptions
        setFoodAllergiesSelected={setFoodAllergiesSelected}
        setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
        setTimeSelected={setTimeSelected}
        setDifficultySelected={setDifficultySelected}
        />
      {/* Button to add a new ingredient field */}
      <Grid item>
        <button type="submit">
          Save
        </button>
      </Grid>
      <Grid item>

      </Grid>
    </Grid>
    </form>
  );
}

RecipeCreator.propTypes = {
  completeFunction: PropTypes.func.isRequired,
};
