/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary();
    table.string("title").unique().notNullable();
    table.string("servings").notNullable(); // TODO CHANGE TO INTEGER
    table.text("prepSteps").notNullable();
    table.boolean("isPublic").notNullable();
    table
      .integer("author")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("edited").defaultTo(knex.fn.now());

    // // allergens
    // table.boolean("Eggs").notNullable();
    // table.boolean("Milk").notNullable();
    // table.boolean("Peanuts").notNullable();
    // table.boolean("Soy").notNullable();
    // table.boolean("Wheat").notNullable();
    // table.boolean("Shellfish").notNullable();
    // table.boolean("Fish").notNullable();
    // table.boolean("Tree Nuts").notNullable();
    // // dietary restrictions
    // table.boolean("Gluten Free").notNullable();
    // table.boolean("Dairy Free").notNullable();
    // table.boolean("Vegetarian").notNullable();
    // table.boolean("Vegan").notNullable();
    // table.boolean("Pescatarian").notNullable();
    // table.boolean("Keto").notNullable();
    // table.boolean("Paleo").notNullable();
    // table.boolean("Low-carb").notNullable();
    // table.boolean("Low-sodium").notNullable();
    // table.boolean("Low-fat").notNullable();
    // table.boolean("Nut-free").notNullable();
    // table.boolean("Soy-free").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
