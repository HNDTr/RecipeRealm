/* eslint-disable camelcase */
import { Model } from "objection";
// import { use } from "react";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe"; // eslint-disable-line import/no-cycle

export default class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        id: { type: "integer" },
        username: { type: "string" },
        password: { type: "string" },
        email: { type: "string" },
        created: { type: "date-time" },
      },
    };
  }

  static relationMappings = () => ({
    recipes: {
      // schema for join table between recipes and ingredients (many-to-many relationship)
      relation: Model.HasManyRelation,
      modelClass: Recipe,
      join: {
        from: "users.id",
        to: "recipes.user_id",
      },
    },
    savedRecipes: {
      // schema for join table between tags and recipes (many-to-many relationship)
      relation: Model.ManyToManyRelation,
      modelClass: Recipe,
      join: {
        from: "users.id",
        through: {
          from: "recipe_user.user_id",
          to: "recipe_user.recipe_id",
        },
        to: "recipes.id",
      },
    },
  });
}
