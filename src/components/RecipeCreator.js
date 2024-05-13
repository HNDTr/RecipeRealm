/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, InputLabel } from "@mui/material";
import recipeShape from "./recipeShape";
import styles from "../styles/Editor.module.css";
import FilterOptions from "./FilterOptions";
import IngredientsBar from "./ingredientsBar";

/* eslint-disable no-unused-vars */
export default function RecipeCreator({ completeFunction, selectedRecipe }) {
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedRecipe) {
  //       // Fetch the recipe details
  //       setFormData({
  //         title: selectedRecipe.title || "",
  //         servings: selectedRecipe.servings || 1,
  //         prepSteps: selectedRecipe.prepSteps || "",
  //         isPublic: selectedRecipe.isPublic || false,
  //         author: selectedRecipe.author || 1,
  //       });
  
  //       // Fetch the ingredients based on the recipe ID
  //       const ingredientsResponse = await fetch(`/api/recipes/${selectedRecipe.id}/ingredients`);
  //       const ingredientsData = await ingredientsResponse.json();
  //       setIngredients(ingredientsData.ingredients || []);
  
  //       // Fetch the tags based on the recipe ID
  //       const tagsResponse = await fetch(`/api/recipes/${selectedRecipe.id}/tags`);
  //       const tagsData = await tagsResponse.json();
  //       // Set the tags in your state if you have state to manage them
  //     } else {
  //       // Reset form data if no recipe is selected
  //       setFormData({
  //         title: "",
  //         servings: 1,
  //         prepSteps: "",
  //         isPublic: false,
  //         author: 1,
  //       });
  //       setIngredients([
  //         { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
  //       ]);
  //     }
  //   };
  
  //   fetchData();
  // }, [selectedRecipe]);

  useEffect(() => {
    if (selectedRecipe) {
      setFormData({
        title: selectedRecipe.title || "",
        servings: selectedRecipe.servings || 1,
        prepSteps: selectedRecipe.prepSteps || "",
        isPublic: selectedRecipe.isPublic || false,
        author: selectedRecipe.author || 1,
      });
      setIngredients(selectedRecipe.ingredients || []);
    } else {
      setFormData({
        title: "",
        servings: 1,
        prepSteps: "",
        isPublic: false,
        author: 1,
      });
      setIngredients([
        { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
      ]);
    }
  }, [selectedRecipe]);

  

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
      ingredients,
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
    });
    setIngredients([
      { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
    ]);
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
  selectedRecipe: recipeShape,
};
