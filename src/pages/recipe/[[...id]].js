import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function RecipePage (selectedRecipe){
  const router = useRouter();
  const { id } = router.query;
  const recipe = {
    id: 1,
    title: 'Cookies',
    servings: '12',
    ingredients: ['Flour', 'Sugar', 'Butter'],
    prepSteps: '1. Preheat oven to 350 degrees F',
    dietaryRestrictions: ['None'],
    time: 30,
    difficulty: 'Easy',
  }; // Placeholder recipe data, replace with actual data

  return (
    <Container>
      {recipe && (
        <RecipeDetailsContainer>
          <h3>{recipe.title}</h3>
          <p>Servings: {recipe.servings}</p>
          <p>
            Ingredients: {recipe.ingredients.join(', ') || 'No ingredients'}
          </p>
          <p>Preparation Steps: {recipe.prepSteps}</p>
          <p>
            Dietary Restrictions:{' '}
            {recipe.dietaryRestrictions.join(', ') || 'None'}
          </p>
          <p>Time: {recipe.time} minutes</p>
          <p>Difficulty: {recipe.difficulty}</p>
        </RecipeDetailsContainer>
      )}
    </Container>
  );
};

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
