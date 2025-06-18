/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("roles").del();

  // Inserts seed entries
  await knex("roles").insert([
    { id: 1, name: "admin" },
    { id: 2, name: "user" },
  ]);
};
