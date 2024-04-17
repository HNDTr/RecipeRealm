/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
exports.up = function (knex) {
  // this is the join table that will hold the relationship between recipes and authors (one-to-many relationship)
  return knex.schema.createTable("recipe_author", (table) => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .integer("author_id")
      .references("id")
      .inTable("authors")
      .onDelete("CASCADE");
    table.primary(["recipe_id", "author_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipe_author");
};
