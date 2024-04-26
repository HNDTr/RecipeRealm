/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// migration for join table for ingredients and tags (many-to-many relationship)

exports.up = function (knex) {
  return knex.schema.createTable("ingredient_tags", (table) => {
    table
      .integer("ingredient_id")
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE");
    table
      .integer("tag_id")
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");
    table.primary(["ingredient_id", "tag_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("ingredient_tags");
};
