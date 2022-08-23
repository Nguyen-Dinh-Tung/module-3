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

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
  }
});
const server = http.createServer(async (req, res) => {
  try {
    if (req.url == "/" && req.method == "POST") {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      const product = JSON.parse(data);
      const price = parseInt(product.price);
      const slqInsert = `insert into products (name , price) values ('${product.name}' , ${price})`;
      const slqSelect = "select * from products";
      connection.query(slqInsert, (err) => {
        if (err) {
          throw err;
        }
        console.log("Insert Success");
        res.end();
      });
    }
  } catch (err) {
    return res.end(err.message);
  }
});
server.listen(port, host);
