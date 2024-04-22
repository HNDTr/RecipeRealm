/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/* eslint-disable func-names */

const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./fakeData/tagSeed.json");
  const data = JSON.parse(contents);

  return knex("Tag")
    .del()
    .then(() => knex("Tag").insert(data));
  // .then(() => knex.batchInsert("Tag", data, 1000));
};
