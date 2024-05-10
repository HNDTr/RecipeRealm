/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Ingredient from "./Ingredient"; // eslint-disable-line import/no-cycle
import Tags from "./Tags"; // eslint-disable-line import/no-cycle
import User from "./User"; // eslint-disable-line import/no-cycle

export default class Recipe extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "recipes";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        prepSteps: { type: "string", default: "" },
        // servings: { type: "string" },
        servings: { type: "integer", default: 1 },
        isPublic: { type: "boolean", default: false },
        author: { type: "integer" },
        edited: { type: "string", format: "date-time" },
      },
    };
  }

  static relationMappings = () => ({
    ingredients: {
      // schema for join table between recipes and ingredients
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient,
      join: {
        from: "recipes.id",
        through: {
          from: "recipe_ingredient.recipe_id",
          to: "recipe_ingredient.ingredient_id",
          extra: ["quantity", "units"],
        },
        to: "ingredients.id",
      },
    },
    tags: {
      // schema for join table between tags and recipes
      relation: Model.ManyToManyRelation,
      modelClass: Tags,
      join: {
        from: "recipes.id",
        through: {
          from: "recipe_tags.recipe_id",
          to: "recipe_tags.tag_id",
        },
        to: "tags.id",
      },
    },
    saved: {
      // schema for join table between users and recipes
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "recipes.id",
        through: {
          from: "recipe_user.recipe_id",
          to: "recipe_user.user_id",
        },
        to: "users.id",
      },
    },
    writtenBy: {
      // schema for author of recipe relationship. One to many. User Id of author is stored in the recipe table as a foreign key
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "recipes.author",
        to: "users.id",
      },
    },
  });
}
