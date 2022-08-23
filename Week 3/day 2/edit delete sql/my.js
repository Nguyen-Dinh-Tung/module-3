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
  let method = req.method;
  let urlPath = url.parse(req.url).pathname;
  switch (urlPath) {
    case "/":
      fs.readFile("./index.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, {"content-type": "text/html"});
        res.write(data), res.end();
      });
      break;
    case "/edit":
      editProducts(method, res, req);
    case "/delete":
      if (method == "GET") {
        fs.readFile("./delete.html", "utf-8", (err, data) => {
          res.writeHead(200, {"content-type": "text/html"});
          res.write(data);
          res.end();
        });
      } else {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          let index = qs.parse(data).index;
          const mysqlDelete = `delete from products where id = ${index}`;
          connection.query(mysqlDelete, (err) => {
            if (err) {
              console.log(err);
            }
            console.log("Delete success");
            res.writeHead(301, {location: "/delete"});
            res.end();
          });
        });
      }
      break;
    default:
      res.end();
  }
});
server.listen(port, host);
function editProducts(method, res, req) {
  if (method == "GET") {
    fs.readFile("./edit.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let products = qs.parse(data);
      const mysqlUpdate = `update products set name = '${products.name}' , price = ${products.price} where id = ${products.index} `;
      connection.query(mysqlUpdate, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Success Update!");
        res.writeHead(301, {location: "/edit"});
        res.end();
      });
    });
  }
}
