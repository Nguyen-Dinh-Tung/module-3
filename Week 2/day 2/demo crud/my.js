const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
let html = "";
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
data.forEach((element) => {
  html += `<tr>`;
  html += `<td>${element.id + 1}</td>`;
  html += `<td>${element.name}</td>`;
  html += `<td><button>Xóa</button></td>`;
  html += `<tr>`;
});

const server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    data = data.replace("{list-user}", html);
    res.writeHead(200, {"content-type": "text/html"});
    res.write(data);
    res.end();
  });
});

server.listen(port, host);
