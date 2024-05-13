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
          console.log(data);
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
          console.log(data);
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
    console.log("Ur Mom");
    console.log(selectedRecipe);
    // const recIngredients = recipes.query().findById(selectedRecipe.id).withGraphFetched('ingredients');
    // console.log(recIngredients);
    router.push(`/recipe/${selectedRecipe.id}/edit`);
  };



  // eslint-disable-next-line no-param-reassign
  selectedRecipe = {
    ...selectedRecipe,
    dietaryRestrictions: fetchedTags,
    time: 60,
    difficulty: "Easy",
    ingredients: fetchedIngredients,
    // ingredients: fetchedIngredients.map(ingredient => ingredient.name),
  };

  
  return (
    <Container>
      {selectedRecipe && (
        <RecipeDetailsContainer>
          <h3>{selectedRecipe.title}</h3>
          <p>Servings: {selectedRecipe.servings}</p>
          {selectedRecipe.ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <p>{ingredient.quantity} {ingredient.units} of {ingredient.name} </p>
            </div>
          ))}

          {/* <p>
            Ingredients:{" "}
            {selectedRecipe.ingredients.join(", ") || "No ingredients"}
          </p> */}
          <p>Preparation Steps: {selectedRecipe.prepSteps}</p>
          <p>
            Dietary Restrictions:{" "}
            {selectedRecipe.tags.map((tag) => (
            <div key={tag.id}>
              <p>{tag.name} </p>
            </div>
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

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;


  // // eslint-disable-next-line no-unused-vars
  // const selectedRecipeIngredients = async () => {
  //   try {
  //     const response = await fetch(`/api/recipes_ingredients/${selectedRecipe.id}`);
  //     if (response.ok) {
  //       console.log(response);
  //       console.log("Success");
  //       const data = await response.json();
  //       console.log(data);
  //       // return data;
  //        // Set fetched ingredients in state variable
  //       setFetchedIngredients(data);
  //        // Update selectedRecipe with fetched ingredients
  //        // Note: This will not update the UI instantly
  //        // You may need to use useEffect to update the UI after state changes

  //        // eslint-disable-next-line no-param-reassign
  //       //  selectedRecipe = {
  //       //    ...selectedRecipe,
  //       //    ingredients: data.map(ingredient => ingredient.name),
  //       //  };  
  //     } else {
  //       console.log("Failed to fetch ingredients");
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching ingredients:", error);
  //   }
  // };
  // selectedRecipeIngredients();