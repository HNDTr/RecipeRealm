import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import recipes from "../api/recipes";
// import recipeShape from "@/components/recipeShape";

export default function RecipePage({ selectedRecipe }) {
  const router = useRouter();

  const [fetchedIngredients, setFetchedIngredients] = useState([]);
  const [fetchedTags, setFetchedTags] = useState([]);
  

  useEffect(() => {
    const selectedRecipeIngredients = async () => {
      try {
        const response = await fetch(`/api/recipes_ingredients/${selectedRecipe.id}`);
        if (response.ok) {
          console.log("Success");
          const data = await response.json();
          setFetchedIngredients(data);
        } else {
          console.log("Failed to fetch ingredients");
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
  
    selectedRecipeIngredients();
  }, []);

  useEffect(() => {
    const selectedRecipeTags = async () => {
      try {
        const response = await fetch(`/api/recipes_tags/${selectedRecipe.id}`);
        if (response.ok) {
          console.log("Success");
          const data = await response.json();
          setFetchedTags(data);
        } else {
          console.log("Failed to fetch tags");
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
  
    selectedRecipeTags();
  }, []);


  const handleEdit = () => {
    router.push({
      pathname: `/recipe/${selectedRecipe.id}/edit`,
      query: {
        ingredients: JSON.stringify(fetchedIngredients),
        tags: JSON.stringify(fetchedTags),
      },
    });
  };


  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    tags: fetchedTags,
    time: 60,
    difficulty: "Easy",
    ingredients: fetchedIngredients,
    // ingredients: fetchedIngredients.map(ingredient => ingredient.name),
  };

  
  return (
    <Container>
      <BackButton onClick={() => router.back()}>View Other Recipes</BackButton>
      {selectedRecipe && (
        <RecipeDetailsContainer>
          <h3>{selectedRecipe.title}</h3>
          <p>Servings: {selectedRecipe.servings}</p>
          <div>
            <p><strong>Ingredients</strong></p>
            {selectedRecipe.ingredients.map((ingredient) => (
              <div key={ingredient.id}>
                <p>{ingredient.quantity} {ingredient.units} of {ingredient.name}</p>
              </div>
            ))}
          </div>
          <p><strong>Preparation Steps:</strong></p>
          <p>{selectedRecipe.prepSteps}</p>
          <p>
            <strong>Dietary Restrictions: </strong>
            {selectedRecipe.tags.map((tag, index) => (
              <span key={tag.id}>
                {tag.name}
                {index !== selectedRecipe.tags.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>Time: {selectedRecipe.time} minutes</p>
          <p>Difficulty: {selectedRecipe.difficulty}</p>
        </RecipeDetailsContainer>
      )}
      {/* <EditButton onClick={handleEdit} selectedRecipe={selectedRecipe}>Edit Recipe</EditButton> */}
      <EditButton onClick ={handleEdit}>Edit Recipe</EditButton>
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

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;