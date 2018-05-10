var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/campaigndb";
var db = pgp(connectionString);

module.exports = db;
