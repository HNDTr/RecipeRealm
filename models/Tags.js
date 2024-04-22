/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Tags extends BaseModel {
  static get tableName() {
    return "tags";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: "name",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
    };
  }

  static relationMappings = () => ({
    recipes: {
      // TODO update other mappings to follow this pattern (04/21/2024)
      relation: Model.ManyToManyRelation,
      modelClass: "Recipe",
      join: {
        from: "tags.id",
        through: {
          from: "recipe_tags.tag_id",
          to: "recipe_tags.recipe_id",
        },
        to: "recipes.id",
      },
    },
    ingredients: {
      relation: Model.ManyToManyRelation,
      modelClass: "Ingredient",
      join: {
        from: "tags.id",
        through: {
          from: "ingredient_tags.tag_id",
          to: "ingredient_tags.ingredient_id",
        },
        to: "ingredients.id",
      },
    },
  });
}
