/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email", 255).notNullable().unique();
      table.string("password", 255).notNullable();
      table.integer("role_id").unsigned().notNullable();
      table
        .foreign("role_id")
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT");
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
