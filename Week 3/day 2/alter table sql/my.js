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
    const sqlCreateTable =
      "create table city (id int not null auto_increment primary key  , nameCity varchar(255) not null , zipCode varchar(255) not null)";
    const sqlAlter = "alter table city add food varchar(255)";
    const sqlInsert =
      "insert into city (nameCity , zipCode , food) values ('Ha Noi' , '30' ,'Dat chat nguoi dong')";
    const slqSelect = "select * from city";
    connection.query(slqSelect, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    });
  }
});
