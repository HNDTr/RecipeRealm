import { createRouter } from "next-connect";
// import { onError } from "../../../lib/middleware";
// import { knex } from "../../../../knex/knex";
// import Article from "../../../../models/Article";
import Recipe from "../../../../models/Recipe";
import { onError } from "../../../lib/middleware";

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
    const { id, ...updatedRecipe } = req.body;
    if (id !== parseInt(req.query.id, 10)) {
      // console.log(id);
      res.status(400).end(`URL and object does not match`);
      return;
    }
    const recipe = await Recipe.query().updateAndFetchById(id, updatedRecipe);
    res.status(200).json(recipe);
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
