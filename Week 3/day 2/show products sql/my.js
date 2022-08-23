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
  let html = "";
  const sqlSelect = "select * from products";
  let data;
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.log(err);
    }
    results.forEach((element, index) => {
      html += `
      <tr>
      <td>${index + 1}</td>
      <td>${element.name}</td>
      <td>${element.price}</td>
      </tr>
    `;
    });
    fs.readFile("./index.html", "utf-8", (err, data) => {
      data = data.replace("{change}", html);
      res.writeHead(200, {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  });
});
server.listen(port, host);
