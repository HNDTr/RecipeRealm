/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ingredients");
};
