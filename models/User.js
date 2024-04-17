/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "users";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: "username",
      properties: {
        id: { type: "integer" },
        password: { type: "string" },
        email: { type: "string" },
        created: { type: "date-time" },
      },
    };
  }

  static relationMappings = {
    // TODO: make sure this works! (04/16/2024)
    related: {
      relation: Model.HasManyRelation,
      modelClass: User, // eslint-disable-line no-use-before-define
      join: {
        from: "author.id",
        through: {
          from: "author_recipes.author_id",
          to: "author_recipes.recipe_id",
        },
        to: "recipe.id",
      },
    },
  };
}
