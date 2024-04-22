/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Ingredient extends BaseModel {
  static get tableName() {
    return "ingredients";
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

  static relationMappings = {
    recipes: {
      relation: Model.ManyToManyRelation,
      modelClass: "Recipe", // eslint-disable-line no-use-before-define
      join: {
        from: "ingredients.id",
        through: {
          from: "recipe_ingredient.ingredient_id",
          to: "recipe_ingredient.recipe_id",
        },
        to: "recipes.id",
      },
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: "Tags", // eslint-disable-line no-use-before-define
      join: {
        from: "ingredients.id",
        through: {
          from: "ingredient_tags.ingredient_id",
          to: "ingredient_tags.tag_id",
        },
        to: "tags.id",
      },
    },
  };
}
