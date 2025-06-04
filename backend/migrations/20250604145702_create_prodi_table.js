/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("prodi", (table) => {
    table.increments("id").primary();
    table.string("nama").notNullable();
    table.string("kode").notNullable();
    table.string("jenjang").notNullable();
    table.string("akreditasi").notNullable();
    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("prodi");
};
