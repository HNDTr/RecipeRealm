import { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Searching from "../components/FilterOptions";
import RecipeTitles from "@/components/RecipeTitles";
import SearchBar from "@/components/SearchBar";

function GlobalRecipe() {
  const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
  const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] =
    useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState([]);
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
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error fetching all recipes ${error}`));
  }, [recipes]);

  const handleRecipeClick = (recipe) => {
    // eslint-disable-next-line no-console
    console.log("Recipe clicked:", recipe);
  };

  const searchKeywords = (searchText) => {
    // We will use this search text to filter recipes and decide what to show.
    // eslint-disable-next-line no-console
    console.log("Search text:", searchText);
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
      <Searching
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
      <RecipeTitles onRecipeClick={handleRecipeClick} recipes={recipes}/>
    </div>
  );
}

export default GlobalRecipe;
