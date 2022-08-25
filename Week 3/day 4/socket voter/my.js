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
const {Server} = require("socket.io");
let mimeTypes = {
  jpg: "images/jpg",
  png: "images/png",
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
  eot: "application/vnd.ms-fontobject",
};

const server = http.createServer((req, res) => {
  let urlPathName = url.parse(req.url).pathname;
  switch (urlPathName) {
    case "/":
      res.writeHead(200, {"content-type": "text/html"});
      fs.createReadStream("./views/index.html").pipe(res);
      break;
  }
  const fileDefences = req.url.match(/\.js|.css/);
  if (fileDefences) {
    const extension = mimeTypes[fileDefences[0].toString().split(".")[1]];
    res.writeHead(200, {"content-type": extension});
    fs.createReadStream(__dirname + "/" + req.url).pipe(res);
  }
});
server.listen(port, host);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("sent-message", (data) => {
    let message = data.name + " " + data.message;
    io.emit("comment", message);
  });
});
