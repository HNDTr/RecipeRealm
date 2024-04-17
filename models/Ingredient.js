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
      required: "title",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
    };
  }

  static relationMappings = {
    related: {
      // this is the join table for the many-to-many relationship of ingredients and tags
      // TODO: make sure this is sensible (04/16/2024)
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient, // eslint-disable-line no-use-before-define
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
