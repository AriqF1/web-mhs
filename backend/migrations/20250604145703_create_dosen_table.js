/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("dosen", (table) => {
    table.increments("id").primary();
    table.string("nama").notNullable();
    table.string("nip").notNullable().unique();
    table.string("email").notNullable().unique();
    table
      .integer("prodi_id")
      .unsigned()
      .references("id")
      .inTable("prodi")
      .onDelete("CASCADE")
      .notNullable();
    table.string("status").notNullable().defaultTo("Aktif");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("dosen");
};
