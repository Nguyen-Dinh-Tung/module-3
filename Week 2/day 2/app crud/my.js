const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const ManagerController = require("./controller/ManagerControler");
let path = [
  "./src/public/home.html",
  "./register.html",
  "./src/public/manager.html",
  "data.json",
  "./src/public/editUser.html",
];
let manager = new ManagerController();

const server = http.createServer((req, res) => {
  let urlPath = url.parse(req.url);
  let method = req.method;
  switch (urlPath.pathname) {
    case "/":
      manager.showPage(req, res, path[0]);
      break;
    case "/register":
      if (method == "GET") {
        manager.showPage(req, res, path[1]);
      } else {
        manager.writeToJson(req, res, path[1]);
      }
      break;
    case "/manager":
      manager.showManagerPage(req, res, path[2]);
      break;
    case "/delete":
      let index = urlPath.query;
      manager.deleteAcount(req, res, path[2], index);
      break;
    case "/edit":
      let id = urlPath.query;
      if (method == "GET") {
        manager.showEditUser(req, res, path[4], id);
      } else {
        manager.editUser(req, res, id, path[2]);
      }
      break;
    default:
      res.end();
  }
});

server.listen(port, host);
