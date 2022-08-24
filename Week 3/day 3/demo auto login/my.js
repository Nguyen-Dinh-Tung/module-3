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
const path = [
  "./views/home.html",
  "./views/login.html",
  "./views/notfound.html",
];
const urlName = ["/", "/login", "/notfound"];
let listToken = [];
const server = http.createServer((req, res) => {
  const urlPath = url.parse(req.url);
  const method = req.method;
  const urlPathName = urlPath.pathname;
  switch (urlPathName) {
    case urlName[0]:
      getTemplace(req, res, path[0]);
      break;
    case urlName[1]:
      if (method == "GET") {
        getTemplace(req, res, path[1]);
      } else {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          let users = qs.parse(data);
          let expires = Date.now() + 1000 * 60 * 60;
          let tokenSession =
            '{"name":"' +
            users.name +
            '","password":"' +
            users.pass +
            '","expires":' +
            expires +
            "}";
          let tokenId = createTokenSession(tokenSession);
          console.log(tokenId);
          fs.readFile(path[0], "utf-8", (err, data) => {
            if (err) {
              console.log(err);
            }
            data = data.replace("{name}", users.name);
            data = data.replace("{pass}", users.pass);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
          });
        });
      }
      break;
    case urlName[2]:
      getTemplace(req, res, path[2]);
      break;
    default:
      res.end();
  }
});

server.listen(port, host);

function getTemplace(req, res, pathName) {
  fs.readFile(pathName, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.writeHead("200", {"content-type": "text/html"});
    res.write(data);
    res.end();
  });
}

const createRandomString = function (strLength) {
  strLength =
    (typeof strLength == "number") & (strLength > 0) ? strLength : false;
  if (strLength) {
    var possibleCharacter = "abcdefghiklmnopqwerszx1234567890";
    var str = "";
    for (let i = 0; i < strLength; i++) {
      let ramdomCharater = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length)
      );
      str += ramdomCharater;
    }
    return str;
  }
};

const createTokenSession = function (data) {
  let tokenId = createRandomString(20);
  let fileName = "./token/" + tokenId;
  listToken.push(fileName);
  fs.writeFile(fileName, data, (err) => {});
  return fileName;
};
