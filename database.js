const mysql = require("mysql");
const CONFIG = require("./config/db");

const pool = mysql.createPool({
  connectionLimit: 10,
  ...CONFIG,
});

module.exports = pool;
