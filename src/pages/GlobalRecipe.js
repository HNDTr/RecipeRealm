import Searching from "../components/Searching";
import RecipeTitles from "@/components/RecipeTitles";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

function GlobalRecipe() {

    /* eslint-disable no-unused-vars */
    const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
    const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] = useState([]);
    const [timeSelected, setTimeSelected] = useState([]);
    const [difficultySelected, setDifficultySelected] = useState([]);
    /* eslint-disable no-unused-vars */
  
  
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
    console.log("Filters applied");
    console.log("Food Allergies Selected: ", foodAllergiesSelected)
    console.log("Dietary Restrictions Selected: ", dietaryRestrictionsSelected)
    console.log("Time Selected: ", timeSelected)
    console.log("Difficulty Selected: ", difficultySelected)
  };

  return (
    <div>
      <SearchBar searchKeywords={searchKeywords} />
      <Searching 
        setFoodAllergiesSelected={setFoodAllergiesSelected} 
        setDietaryRestrictionsSelected={setDietaryRestrictionsSelected}
        setTimeSelected={setTimeSelected}
        setDifficultySelected={setDifficultySelected}
        applyFilters={applyFilters}
        />
      <RecipeTitles onRecipeClick={handleRecipeClick} />
    </div>
  );
}

export default GlobalRecipe;
