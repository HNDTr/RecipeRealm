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
      const { ingredients, ...recipeData } = req.body; // Extract recipe data from request body

      const newIngredients = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const ingredient of ingredients) {
        // eslint-disable-next-line no-await-in-loop
        const existingIngredient = await Ingredient.query().findOne({
          name: ingredient.name,
        });

        if (!existingIngredient) {
          newIngredients.push({ name: ingredient.name });
        }
      }

      // Insert new ingredients into the database
      if (newIngredients.length > 0) {
        await Ingredient.query().insert(newIngredients);
      }

      // Insert the recipe into the database
      const recipe = await Recipe.query().insert(recipeData);

      await Promise.all(
        ingredients.map(async (ingredient) => {
          const { id } = await Ingredient.query().findOne({
            name: ingredient.name,
          });
          await Recipe.relatedQuery("ingredients").for(recipe.id).relate({
            id,
            quantity: ingredient.quantity,
            units: ingredient.unit,
          });
        }),
      );

      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
