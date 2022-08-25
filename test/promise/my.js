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
const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
};
const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = url.parse(req.url).pathname;
  switch (urlPath) {
    case "/":
      res.writeHead(200, {"content-type": "text/html"});
      fs.createReadStream("./views/index.html").pipe(res);
      const filesDefences = req.url.match(/\.js|.css/);
      if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, {"content-type": extension});
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
      }
      break;
  }
});
server.listen(port, host);
const io = new Server();
const todolist = [];
let index = 0;
io.on("connection", (socket) => {
  socket.on("addTask", (task) => {
    todolist.push(task);
    socket.broadcast.emit("addTask", {task: task, index: index});
    index++;
    console.log(index);
  });
});
