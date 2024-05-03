import { useState } from "react";
import { styled } from "@mui/material/styles";
import FilterDropdown from "@/components/FilterDropdown";
import allergiesOptions from "../../data/allergies.json";
import dietaryRestrictionsOptions from "../../data/dietaryRestrictions.json";
import timeOptions from "../../data/time.json";
import difficultyOptions from "../../data/difficulty.json";
// import { Button } from "@mui/material";
/*
    Own Notes:
        - We want the results of what shows up on the page to change based on the searchText
        and filters so we must keep these in sync using states.

        - Here we will show all of the filters as well. 
            Filters - Difficulty, Time commitment, Ingredients, Allergens, 
        
        - We'll be making multiple filters, so FilterDropDown is responsible for making reusable dropDown filters.

        - All of this will rendered in globalRecipeBook.js
*/

const Container = styled("div")(({ theme: styledTheme }) => ({
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(0),
}));

const Wrapper = styled("div")(({ theme: styledTheme }) => ({
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(0),
}));

const Right = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  flex: "1",
  alignItems: "flex-start", // Align elements to flex-start
  justifyContent: "flex-end",
  marginTop: styledTheme.spacing(1),
  flexDirection: "column",
}));

const Left = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  flex: "1", // Make the Left div take equal space
  alignItems: "center",
  marginTop: styledTheme.spacing(1),
}));

export default function RecipeSearch() {
  /* eslint-disable no-unused-vars */
  const [searchText, setSearchText] = useState("");
  const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
  const [dietaryRestrictionsSelected, setDietaryRestrictionsSelected] =
    useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState([]);
  /* eslint-disable no-unused-vars */

  return (
    <Container>
      <Wrapper>
        <Right>
          <FilterDropdown
            title="Food Allergies"
            options={allergiesOptions}
            onSelect={setFoodAllergiesSelected}
          />
          <FilterDropdown
            title="Dietary Restrictions"
            options={dietaryRestrictionsOptions}
            onSelect={setDietaryRestrictionsSelected}
          />
          <FilterDropdown
            title="Time"
            options={timeOptions}
            onSelect={setTimeSelected}
          />
          <FilterDropdown
            title="Difficulty"
            options={difficultyOptions}
            onSelect={setDifficultySelected}
          />
        </Right>
        <Left>Testing</Left>
      </Wrapper>
    </Container>
  );
}
