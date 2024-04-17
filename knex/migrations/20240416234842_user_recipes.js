/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
exports.up = function (knex) {
  // this is the join table that will be used to hold the relationship between recipes and users (many-to-many relationship)
  return knex.schema.createTable("recipe_user", (table) => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.primary(["recipe_id", "user_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipe_user");
};
