import styled from "styled-components";
import PropTypes from "prop-types";

export default function RecipePage({ selectedRecipe }) {
  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    dietaryRestrictions: ["Gluten Free, Vegetarian"],
    time: 60,
    difficulty: "Easy",
    ingredients: ["1 cup of flour", "1 cup of sugar", "1 cup of water"],
  };

  return (
    <Container>
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
