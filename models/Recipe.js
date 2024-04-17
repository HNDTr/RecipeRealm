/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Recipe extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "recipes";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: "title",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        prepSteps: { type: "string", default: "" },
        servings: { type: "string" },
        isPublic: { type: "boolean", default: false },
        author: { type: "string" },
        edited: { type: "string", format: "date-time" },
      },
    };
  }

  static relationMappings = {
    related: {
      relation: Model.ManyToManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "recipes.id",
        through: [
          {
            // for the recipe_ingredient join table
            from: "recipe_ingredient.recipe_id",
            to: "recipe_ingredient.ingredient_id",
          },
          {
            // for the recipe_tags join table
            from: "recipe_tags.recipe_id",
            to: "recipe_tags.tag_id",
          },
          {
            // for the user_recipes join table
            from: "user_recipes.recipe_id",
            to: "user_recipes.user_id",
          },
        ],
        to: "recipes.id",
      },
    },
  };
}
