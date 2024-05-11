/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // this is the join table that will be used to hold the relationship between recipes and users (many-to-many relationship)
  // this is not the author of the recipe, but rather the users that have saved the recipe to their list
  // Create the recipe_user table
  const createRecipeUserTable = knex.schema.createTable("recipe_user", (table) => {
    table.integer("recipe_id").references("id").inTable("recipes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.primary(["recipe_id", "user_id"]);
  });

  // Create the User table
  const createUserTable = knex.schema.createTable("User", (table) => {
    table.increments("id").primary();
    table.string("googleId");
    table.string("name");
    table.text("email");
  });

  return Promise.all([createRecipeUserTable, createUserTable]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  const dropUserTable = knex.schema.dropTableIfExists("User");
  const dropRecipeUserTable = knex.schema.dropTableIfExists("recipe_user");

  return Promise.all([dropUserTable, dropRecipeUserTable]);
};
