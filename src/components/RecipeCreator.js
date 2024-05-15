import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSession } from "next-auth/react";
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
    author: session?.user?.id,
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0.0, unit: "cups", indexInRecipe: 0 },
  ]);

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
      servings: +servings,
      prepSteps,
      isPublic,
      author,
      ingredients,
      edited: currentDate,
    };
    await completeFunction(newRecipe);
    setFormData({
      title: "",
      servings: 1,
      prepSteps: "",
      isPublic: false,
      author: session.user.id,
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    isPublic: e.target.checked,
                  }))
                }
                name="isPublic"
                color="primary"
              />
            }
            label="Public"
          />
        </Grid>
        <Grid item xs={12}>
          <FilterOptions />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
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
