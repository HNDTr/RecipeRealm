import { useState } from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import styles from "../styles/Editor.module.css";
import FilterOptions from "./FilterOptions";
import IngredientsBar from "./ingredientsBar";

export default function RecipeCreator({ completeFunction }) {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    servings: 1,
    prepSteps: "",
    isPublic: false,
    author: session.user.id,
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
  ]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newRecipe = {
      ...formData,
      servings: +formData.servings,
      ingredients,
      edited: currentDate,
    };
    await completeFunction(newRecipe);
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
            value={formData.title}
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
            value={formData.servings}
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
            value={formData.prepSteps}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>
            Public:
            <input
              type="checkbox"
              checked={formData.isPublic}
              name="isPublic"
              data-testid="publicCheckbox"
              onChange={onChange}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={12}>
          <FilterOptions />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

RecipeCreator.propTypes = {
  completeFunction: PropTypes.func.isRequired,
};
