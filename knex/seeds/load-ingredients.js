/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */
const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/ingredientSeed.json");
  const data = JSON.parse(contents);

  return knex("Ingredient")
    .del()
    .then(() => knex("Ingredient").insert(data));
  // .then(() => knex.batchInsert("Ingredient", data, 1000));
};
