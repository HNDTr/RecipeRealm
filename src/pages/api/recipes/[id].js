import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import { onError } from "../../../lib/middleware";
import Ingredient from "../../../../models/Ingredient";

const router = createRouter();

router
  .get(async (req, res) => {
    const recipe = await Recipe.query()
      // .withGraphFetched("related")
      .findById(req.query.id)
      .throwIfNotFound();
    res.status(200).json(recipe);
  })
  .put(async (req, res) => {
    const { id: bodyId, ingredients, ...recipeData } = req.body; // Extract data from request body
    const { id: queryId } = req.query; // Extract id from query parameters (URL)

  if (bodyId !== parseInt(queryId, 10)) {
    res.status(400).end(`URL and object do not match`);
    return;
  }
    
    try {
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
      const updatedRecipe = await Recipe.query().patchAndFetchById(queryId, recipeData);
      // This line updates the row in the Recipe table with the ID queryId using the data provided in recipeData. It then fetches the updated recipe from the database and assigns it to the updatedRecipe variable. 
      // Patch: It updates the specified fields of a row in the database table corresponding to the given ID. It's like a partial update where you provide only the fields you want to change.
      // Fetch: After the update operation is completed, it fetches the updated row from the database and returns it.

      await Promise.all(
        ingredients.map(async (ingredient) => {
          const { id } = await Ingredient.query().findOne({
            name: ingredient.name,
          });
          await Recipe.relatedQuery("ingredients").for(updatedRecipe.id).relate({
            id,
            quantity: ingredient.quantity,
            units: ingredient.unit,
          });
        }),
      );

      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
