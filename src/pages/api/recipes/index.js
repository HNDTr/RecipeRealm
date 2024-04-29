import { createRouter } from "next-connect";
import { onError } from "../../../lib/middleware";
import Recipe from "../../../../models/Recipe";
import Ingredient from "../../../../models/Ingredient";

const router = createRouter();

router
  .get(async (req, res) => {
    // Implement endpoint to fetch all articles (deleting placeholder response code below),
    // possibly filtering by section
    let query = Recipe.query();
    if (req.query.section) {
      query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = ?", [
        req.query.section,
      ]);
    }
    const recipes = await query;
    res.status(200).json(recipes);
  })
  .post(async (req, res) => {
    try {
      // Extracting ingredients from request body
      // eslint-disable-next-line prefer-destructuring
      const ingredients = req.body.ingredients;
      // console.log(ingredients);
      // console.log(ingredients.name)

      // Array to store newly added ingredients
      const newIngredients = [];

      // Checking each ingredient if it exists in the database
      // eslint-disable-next-line no-restricted-syntax
      for (const element of ingredients) {
        // console.log(element.name);
        // eslint-disable-next-line no-await-in-loop
        const existingIngredient = await Ingredient.query().findOne({
          name: element.name,
        });
        if (!existingIngredient) {
          const newIngredient = {
            name: element.name,
          };
          newIngredients.push(newIngredient);
        }
      }

      // Inserting new ingredients into the database
      if (newIngredients.length > 0) {
        await Ingredient.query().insert(newIngredients);
      }

      // Inserting the recipe into the database
      const recipe = await Recipe.query().insert(req.body);

      res.status(200).json(recipe);
    } catch (error) {
      // If any error occurs, return a 500 status code and the error message
      res.status(500).json({ error: error.message });
    }
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
