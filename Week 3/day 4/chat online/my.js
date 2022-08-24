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

const {createServer} = require("http");
const {Server} = require("socket.io");
const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
};

const httpServer = createServer(function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("./templates/index.html").pipe(res);
  }
  /* đọc file css/js*/
  const filesDefences = req.url.match(/\.js|.css/);
  if (filesDefences) {
    const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    res.writeHead(200, {"Content-Type": extension});
    fs.createReadStream(__dirname + "/" + req.url).pipe(res);
  }
});

const io = new Server(httpServer);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

httpServer.listen(3000, "localhost", function () {
  console.log("Server running in http://localhost:3000");
});

httpServer.listen(port, host);
