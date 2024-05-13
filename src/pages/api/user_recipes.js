import { createRouter } from "next-connect";
import Recipe from "../../../models/Recipe";
import User from "../../../models/User";
import { onError } from "../../lib/middleware";

// This is the API route for saving a recipe to a user's account

const router = createRouter();

router.post(async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { recipe_id, user_id } = req.body;
    const user = await User.query().findById(user_id);
    const recipe = await Recipe.query().findById(recipe_id);
    await user.$relatedQuery("savedRecipes").relate(recipe);
    res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router.handler({ onError });
