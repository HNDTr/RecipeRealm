import PropTypes from "prop-types";
import styled from "styled-components";

function RecipeTitles({ recipes, setSelectedRecipe }) {
  return (
    <div>
      <RecipeListContainer>
        {recipes.map((recipe) => (
          <RecipeContainer key={recipe.id}>
            <RecipeName>{recipe.title}</RecipeName>
            <SeeMoreText
              onClick={() => {
                setSelectedRecipe(recipe);
                // eslint-disable-next-line no-console
                console.log("Selected Recipe:", recipe);
              }}
            >
              See Complete Recipe
            </SeeMoreText>
          </RecipeContainer>
        ))}
      </RecipeListContainer>
    </div>
  );
}

RecipeTitles.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  setSelectedRecipe: PropTypes.func,
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
