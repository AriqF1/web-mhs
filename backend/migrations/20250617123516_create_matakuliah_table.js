/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("matakuliah", function (table) {
    table.increments("id").primary();
    table.string("kode_matakuliah").notNullable().unique();
    table.string("nama_matakuliah").notNullable();
    table.integer("sks").notNullable();
    table
      .integer("prodi_id")
      .unsigned()
      .references("id")
      .inTable("prodi")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("matakuliah");
};
