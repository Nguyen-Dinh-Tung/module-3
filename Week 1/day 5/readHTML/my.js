const http = require("http");
const qs = require("qs");
const fs = require("fs");
const sever = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.writeHead(200, {"content-type": "text/html"});
    res.write(data);
    res.end();
  });
});
sever.listen(3000, "localhost");
