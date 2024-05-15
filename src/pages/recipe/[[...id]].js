import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const buttonStyle = {
  backgroundColor: "#18453B",
  color: "white",
  textTransform: "none",
  fontSize: "1em",
  padding: "10px 20px",
  margin: "10px 0",
  borderRadius: "5px",
};

export default function RecipePage({ selectedRecipe }) {
  const router = useRouter();
  const { data: session } = useSession();

  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    dietaryRestrictions: ["Gluten Free", "Vegetarian"],
    time: 60,
    difficulty: "Easy",
    ingredients: ["1 cup of flour", "1 cup of sugar", "1 cup of water"],
    prepSteps: "Mix all ingredients and bake at 350°F for 30 minutes.",
  };

  const capitalizeFirstLetter = (string) => {
    // Check if string is defined and not null
    if (typeof string !== "string" || string.length === 0) {
      return ""; // or any other fallback behavior you prefer
    }

    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // Write a callback to the save button that will save the recipe to the user's account (using the user_recipes table in the database)
  const saveRecipe = async () => {
    /* eslint-disable no-console */
    if (session) {
      // Save the recipe to the user's account
      const response = await fetch("/api/user_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: selectedRecipe.id,
          user_id: session.user.id,
        }),
      });
      if (response.ok) {
        console.log("Recipe saved successfully");
      } else {
        console.log("Failed to save recipe");
        console.log(response);
      }
    } else {
      // Save the recipe to a fake user id
      const response = await fetch("/api/user_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: selectedRecipe.id,
          user_id: 1,
        }),
      });
      if (response.ok) {
        console.log("Recipe saved successfully");
      } else {
        console.log("Failed to save recipe");
      }
    }
    /* eslint-enable no-console */
  };

  return (
    <Container>
      <Button onClick={() => router.back()} style={buttonStyle}>
        View Other Recipes
      </Button>
      {selectedRecipe && (
        <RecipeDetailsCard>
          <RecipeTitle>
            {capitalizeFirstLetter(selectedRecipe.title)}
          </RecipeTitle>
          <RecipeInfo>
            <InfoLabel>Servings:</InfoLabel> {selectedRecipe.servings}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Ingredients:</InfoLabel>{" "}
            {selectedRecipe.ingredients.join(", ")}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Preparation Steps:</InfoLabel> {selectedRecipe.prepSteps}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Dietary Restrictions:</InfoLabel>{" "}
            {selectedRecipe.dietaryRestrictions.join(", ") || "None"}
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Time:</InfoLabel> {selectedRecipe.time} minutes
          </RecipeInfo>
          <RecipeInfo>
            <InfoLabel>Difficulty:</InfoLabel> {selectedRecipe.difficulty}
          </RecipeInfo>
          <Button onClick={saveRecipe} style={buttonStyle}>
            Save Recipe
          </Button>
        </RecipeDetailsCard>
      )}
    </Container>
  );
}

RecipePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedRecipe: PropTypes.object,
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeDetailsCard = styled.div`
  margin-top: 20px;
  margin-bottom: 110px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 600px;
  width: 100%;
`;

const RecipeTitle = styled.h3`
  text-align: center;
  font-size: 2.5em;
  color: #18453b;
  margin-bottom: 20px;
`;

const RecipeInfo = styled.p`
  margin: 10px 0;
  font-size: 1em;
  line-height: 1.5;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #18453b;
`;
