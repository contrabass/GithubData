const knex = require("knex");
const knexfile = require("./knexfile")

//TODO: determine which section to use using an env var
const db = knex(knexfile.development);
module.exports = db;