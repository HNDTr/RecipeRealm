/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */
const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/recipesIngredientsSeed.json");
  const data = JSON.parse(contents);

  return knex("recipe_ingredient")
    .del()
    .then(() => knex("recipe_ingredient").insert(data));
}   