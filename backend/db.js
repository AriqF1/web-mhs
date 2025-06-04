const knex = require("knex");
const config = require("./knexfile");

const env = "development";
const db = knex(config[env]);

module.exports = db;
