import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function RecipePage({ selectedRecipe }) {
  const router = useRouter();
  const { data: session } = useSession();

  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    dietaryRestrictions: ["Gluten Free, Vegetarian"],
    time: 60,
    difficulty: "Easy",
    ingredients: ["1 cup of flour", "1 cup of sugar", "1 cup of water"],
  };

  // Write a callback to the save button that will save the recipe to the user's account (using the user_recipes table in the database)

  const saveRecipe = async () => {
    /* eslint-disable no-console */
    console.log("session: ", session);
    if (session) {
      console.log("User ID:", session.user.id);
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
      console.log("User not signed in");
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
        console.log(response);
        console.log(response.body);
        console.log("Failed to save recipe");
      }
    }
    /* eslint-enable no-console */
  };

  return (
    <Container>
      <BackButton onClick={() => router.back()}>View Other Recipes</BackButton>
      {selectedRecipe && (
        <RecipeDetailsContainer>
          <h3>{selectedRecipe.title}</h3>
          <p>Servings: {selectedRecipe.servings}</p>
          <p>
            Ingredients:{" "}
            {selectedRecipe.ingredients.join(", ") || "No ingredients"}
          </p>
          <p>Preparation Steps: {selectedRecipe.prepSteps}</p>
          <p>
            Dietary Restrictions:{" "}
            {selectedRecipe.dietaryRestrictions.join(", ") || "None"}
          </p>
          <p>Time: {selectedRecipe.time} minutes</p>
          <p>Difficulty: {selectedRecipe.difficulty}</p>
          <SaveButton onClick={saveRecipe}>Save Recipe</SaveButton>
        </RecipeDetailsContainer>
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
`;

const RecipeDetailsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  background-color: #18453b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #0e2d27;
  }
`;

const SaveButton = styled.button`
  margin-bottom: 20px;
  background-color: #18453b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #0e2d27;
  }
`;
