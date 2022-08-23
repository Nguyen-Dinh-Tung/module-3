const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "products",
  charset: "utf8_general_ci",
});

connection.connect(function (err) {
  if (err) {
    throw err.stack;
  } else {
    const sqlSelect = "select * from customer";
    connection.query(sqlSelect, (err, results, field) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    });
  }
});

const server = http.createServer(async (req, res) => {});
server.listen(port, host);
