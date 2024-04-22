/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Ingredient from "./Ingredient";

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

  static relationMappings = () => ({
    ingredients: {
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient,
      join: {
        from: "recipes.id",
        through: {
          from: "recipe_ingredient.recipe_id",
          to: "recipe_ingredient.ingredient_id",
        },
        to: "ingredients.id",
      },
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: "Tags",
      join: {
        from: "recipes.id",
        through: {
          from: "recipe_tags.recipe_id",
          to: "recipe_tags.tag_id",
        },
        to: "tags.id",
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: "User",
      join: {
        from: "recipes.author",
        to: "users.id",
      },
    },
  });
}
