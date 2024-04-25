import { createRouter } from "next-connect";
import { onError } from "../../../lib/middleware";
import Recipe from "../../../../models/Recipe";

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
    // Implement endpoint to create a new article (deleting placeholder response code below)

    const recipe = await Recipe.query().insertAndFetch(req.body);
    res.status(200).json(recipe);
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
