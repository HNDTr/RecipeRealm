// User.js
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["googleId"],
      properties: {
        id: { type: "integer" },
        googleId: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    };
  }

  static relationMappings = () => ({
    recipes: {
      relation: Model.HasManyRelation,
      modelClass: Recipe,
      join: {
        from: "User.id",
        to: "recipes.user_id",
      },
    },
    savedRecipes: {
      relation: Model.ManyToManyRelation,
      modelClass: Recipe,
      join: {
        from: "User.id",
        through: {
          from: "recipe_user.user_id",
          to: "recipe_user.recipe_id",
        },
        to: "recipes.id",
      },
    },
  });

  // Override this method to exclude googleId
  $formatJson(json) {
    const formattedJson = super.$formatJson(json);
    delete formattedJson.googleId;
    return formattedJson;
  }
}
