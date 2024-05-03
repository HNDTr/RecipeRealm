import { useState } from "react";
import { styled } from "@mui/material/styles";
import FilterDropdown from "@/components/FilterDropdown";
import allergiesOptions from "../../data/allergies.json";
import dietaryRestrictionsOptions from "../../data/dietaryRestrictions.json";
import timeOptions from "../../data/time.json";
import difficultyOptions from "../../data/difficulty.json";
import Button from "@mui/material/Button";

/*
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

export default function RecipeSearch({setFoodAllergiesSelected, setDietaryRestrictionsSelected, setTimeSelected, setDifficultySelected, applyFilters}) {

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
            <Button variant="contained" color="primary" onClick={() => applyFilters()}>
              Apply
           </Button>
        </Right>

        <Left>Testing</Left>


      </Wrapper>
    </Container>
  );
}
