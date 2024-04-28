import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; // Import styled-components if not already imported
import recipes from "../../data/recipes.json";

const RecipeTitles = ({ onRecipeClick }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleClick = (recipe) => {
        if (typeof onRecipeClick === 'function') {
            onRecipeClick(recipe);
        }
        setSelectedRecipe(recipe);
    };

    return (
        <RecipeListContainer>
            {recipes
                .filter(recipe => recipe.isPublic) 
                .map((recipe) => (
                    <RecipeContainer key={recipe.id} onClick={() => handleClick(recipe)}>
                        <CoverImage src={recipe.image} alt={recipe.title} />
                        <RecipeName>{recipe.title}</RecipeName>
                        <IngredientsText>Ingredients</IngredientsText>
                        <SeeMoreText onClick={() => window.open(recipe.url)}>See Complete Recipe</SeeMoreText>
                    </RecipeContainer>
                ))}
        </RecipeListContainer>
    );
};

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
