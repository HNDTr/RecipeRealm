/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */

// parent table for tags

exports.up = function (knex) {
  return knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
