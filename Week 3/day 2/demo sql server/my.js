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
    console.log("success conecting");
    const sql =
      "create table customer (id int not null auto_increment primary key,name varchar(255) not null  , address varchar(255) not null)";
    connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("create success!");
      connection.end();
    });
    return;
  }
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url == "/user" && req.url == "POST") {
      const buffers = [];
      for await (const chunk of buffers) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      const userData = JSON.parse(data);
      const sql = `insert into customer(name , address) values (${userData.name} , ${userData.address})`;
      connection.query(sql, (err, results, fields) => {
        if (err) {
          throw err;
        }
        res.end("Success");
      });
    }
  } catch (e) {
    return res.end(e.message);
  }
});
server.listen(port, host);
