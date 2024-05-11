import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FilterOptions from "../components/FilterOptions";
import RecipeTitles from "@/components/RecipeTitles";
import SearchBar from "@/components/SearchBar";

function GlobalRecipe({ selectedRecipe, setSelectedRecipe }) {
  const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
  const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] =
    useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([{}]);
  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    fetch(`/api/recipes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setRecipes(response);
        setOriginalRecipes(response);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error fetching all recipes ${error}`));
  }, []);

  const searchKeywords = (searchText) => {
    if (searchText === "") {
      setRecipes(originalRecipes);
    } else {
      const filteredRecipes = originalRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setRecipes(filteredRecipes);
    }
  };

  const applyFilters = () => {
    // eslint-disable-next-line no-console
    console.log("Filters applied");
    // eslint-disable-next-line no-console
    console.log("Food Allergies Selected: ", foodAllergiesSelected);
    // eslint-disable-next-line no-console
    console.log("Dietary Restrictions Selected: ", dietaryRestrictionsSelected);
    // eslint-disable-next-line no-console
    console.log("Time Selected: ", timeSelected);
    // eslint-disable-next-line no-console
    console.log("Difficulty Selected: ", difficultySelected);
  };

  return (
    <div>
      <SearchBar searchKeywords={searchKeywords} />
      <FilterOptions
        setFoodAllergiesSelected={setFoodAllergiesSelected}
        setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
        setTimeSelected={setTimeSelected}
        setDifficultySelected={setDifficultySelected}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => applyFilters()}
      >
        Apply
      </Button>
      <RecipeTitles
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    </div>
  );
}

GlobalRecipe.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedRecipe: PropTypes.object,
  setSelectedRecipe: PropTypes.func,
};

export default GlobalRecipe;
