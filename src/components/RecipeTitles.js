import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import recipes from "../../data/recipes.json";

function RecipeTitles({ onRecipeClick }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleClick = (recipe) => {
    if (typeof onRecipeClick === "function") {
      onRecipeClick(recipe);
    }
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <RecipeListContainer>
        {recipes
          .filter((recipe) => recipe.isPublic)
          .map((recipe) => (
            <RecipeContainer
              key={recipe.id}
              onClick={() => handleClick(recipe)}
            >
              <CoverImage src={recipe.image} alt={recipe.title} />
              <RecipeName>{recipe.title}</RecipeName>
              <IngredientsText>Ingredients + Quick Stats</IngredientsText>
              <SeeMoreText onClick={() => window.open(recipe.url)}>
                See Complete Recipe
              </SeeMoreText>
            </RecipeContainer>
          ))}
      </RecipeListContainer>
      {selectedRecipe && (
        <RecipeDetails>
          <h3>{selectedRecipe.title}</h3>
          <p>Servings: {selectedRecipe.servings}</p>
          <p>
            Ingredients:{" "}
            {selectedRecipe.ingredients
              ? selectedRecipe.ingredients.join(", ")
              : "No ingredients"}
          </p>
          <p>Preparation Steps: {selectedRecipe.prepSteps}</p>
          <p>
            Dietary Restrictions:{" "}
            {selectedRecipe.dietaryRestrictions.join(", ")}
          </p>
          <p>Time: {selectedRecipe.time} minutes</p>
          <p>Difficulty: {selectedRecipe.difficulty}</p>
        </RecipeDetails>
      )}
    </div>
  );
}

RecipeTitles.propTypes = {
  onRecipeClick: PropTypes.func.isRequired,
};

export default RecipeTitles;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
`;

const CoverImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const RecipeName = styled.h3`
  margin: 10px 0;
`;

const IngredientsText = styled.span`
  cursor: pointer;
  color: blue;
  margin-bottom: 10px;
`;

const SeeMoreText = styled.span`
  cursor: pointer;
  color: blue;
`;

const RecipeDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;
