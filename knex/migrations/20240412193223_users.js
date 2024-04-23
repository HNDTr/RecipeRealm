/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// Parent table for recipes

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("username").notNullable();
    table.timestamp("created").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
