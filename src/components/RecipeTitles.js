import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function RecipeTitles({ onRecipeClick, recipes}) {
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
          .map((recipe) => (
            <RecipeContainer
              key={recipe.id}
              onClick={() => handleClick(recipe)}
            >
              <RecipeName>{recipe.title}</RecipeName>
              <SeeMoreText onClick={() => window.open(recipe.url)}>
                See Complete Recipe
              </SeeMoreText>
            </RecipeContainer>
          ))}
      </RecipeListContainer>
    </div>
  );
}

RecipeTitles.propTypes = {
  onRecipeClick: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object),
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

const RecipeName = styled.h3`
  margin: 10px 0;
`;
/*
const IngredientsText = styled.span`
  cursor: pointer;
  color: blue;
  margin-bottom: 10px;
`;
*/

const SeeMoreText = styled.span`
  cursor: pointer;
  color: blue;
`;

const RecipeDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;
