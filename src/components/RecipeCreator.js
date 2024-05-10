import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, InputLabel } from "@mui/material";
import styles from "../styles/Editor.module.css";
import FilterOptions from "./FilterOptions";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction, currentRecipe }) {
  const [formData, setFormData] = useState({
    title: "",
    servings: 1,
    prepSteps: "",
    isPublic: false,
    author: 2,
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
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
      servings: 1,
      prepSteps: "",
      isPublic: false,
      author: 1,
      ingredients: [
        { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
      ],
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} className={styles.editor}>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={title}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            step="1"
            name="servings"
            placeholder="Servings"
            value={servings}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <IngredientsBar
            ingredients={ingredients}
            name="ingredients"
            setIngredients={setIngredients}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={5}
            type="text"
            name="prepSteps"
            placeholder="Preparation Steps"
            variant="outlined"
            value={prepSteps}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FilterOptions
            setFoodAllergiesSelected={setFoodAllergiesSelected}
            setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
            setTimeSelected={setTimeSelected}
            setDifficultySelected={setDifficultySelected}
          />
        </Grid>
        <Grid item xs={12}>
          <button type="submit">Save</button>
        </Grid>
      </Grid>
    </form>
  );
}

RecipeCreator.propTypes = {
  completeFunction: PropTypes.func.isRequired,
  currentRecipe: recipeShape,
};
