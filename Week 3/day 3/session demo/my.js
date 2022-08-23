const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const mysql = require("mysql");
const cookie = require("cookie");
const escapeHtml = require("escape-html");
const {type} = require("os");

let handlers = {};
const router = {
  login: handlers.login,
  home: handlers.home,
  notfound: handlers.notfound,
};
handlers.login = (req, res) => {
  fs.readFile("./views/login.html", "utf-8", (err, data) => {
    res.writeHead(200, {"content-type": "text/html"});
    res.write(data);
    res.end();
  });
};
handlers.home = (req, res) => {
  fs.readFile("./views/home.html", "utf-8", (err, data) => {
    res.writeHead(200, {"content-type": "text/html"});
    res.write(data);
    res.end();
  });
};

let createRamdomStr = (strLength) => {
  strLength =
    (typeof strLength == "number") & (strLength > 0) ? strLength : false;
  if (strLength) {
    const possibleChar = "abcdefghiklmnopqwerszx1234567890";
    let str = "";
    for (let i = 0; i < strLength; i++) {
      let randomChar = possibleChar.charAt(
        Math.floor(Math.random() * strLength)
      );
      str += randomChar;
    }
    return str;
  }
};
var createTokenSession = function (data) {
  //tao ngau nhien ten file
  let tokenId = createRamdomStr(20);
  let fileName = "./token/" + tokenId;
  fs.writeFile(fileName, data, (err) => {});
};

handlers.home = function (req, res) {
  // xu ly submit
  var data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    data = qs.parse(data);
    let expires = Date.now() + 1000 * 60 * 60;
    let tokenSession =
      '{"name":"' +
      data.name +
      '","email":"' +
      data.email +
      '","password":"' +
      data.password +
      '","expires":' +
      expires +
      "}";
    createTokenSession(tokenSession);
    fs.readFile("./views/homepage.html", "utf8", function (err, datahtml) {
      if (err) {
        console.log(err);
      }
      datahtml = datahtml.replace("{name}", data.name);
      datahtml = datahtml.replace("{email}", data.email);
      datahtml = datahtml.replace("{password}", data.password);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(datahtml);
      return res.end();
    });
  });
  req.on("error", () => {
    console.log("error");
  });
};
const server = http.createServer(function (req, res) {
  var parseUrl = url.parse(req.url, true);
  // //get the path

  var path = parseUrl.pathname;
  var trimPath = path.replace(/^\/+|\/+$/g, "");

  var chosenHandler =
    typeof router[trimPath] !== "undefined"
      ? router[trimPath]
      : handlers.notfound;
  chosenHandler(req, res);
});

server.listen(8080, function () {
  console.log("server running at localhost:8080 ");
});
