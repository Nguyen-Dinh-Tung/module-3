const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: host,
  user: "root",
  password: "123123",
  database: "products",
  charset: "utf8_general_ci",
});

const server = http.createServer(async (req, res) => {
  if (req.url == "/" && req.method == "POST") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    let data = Buffer.concat(buffers).toString();
    let products = JSON.parse(data);
    let price = parseInt(products.price);
    const sqlInsert = `insert into products (name , price) values ('${products.name}' , ${price})`;
    connection.query(sqlInsert, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Success !");
      res.end();
    });
  }
});
server.listen(port, host);
