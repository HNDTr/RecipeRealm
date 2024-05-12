import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function RecipePage({ selectedRecipe }) {
  const router = useRouter();

  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    dietaryRestrictions: ["Gluten Free, Vegetarian"],
    time: 60,
    difficulty: "Easy",
    ingredients: ["1 cup of flour", "1 cup of sugar", "1 cup of water"],
  };

  const handleGoBack = () => {
    router.push("/GlobalRecipe");
  };

  return (
    <Container>
      <BackButton onClick={handleGoBack}>View Other Recipes</BackButton>
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
