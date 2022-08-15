const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const server = http.createServer((req, res) => {
  let method = req.method;
  if (method === "GET") {
    fs.readFile("./index.html", "utf-8", (err, data) => {
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
      let user = qs.parse(data);
      console.log(user);
      fs.readFile("./data.txt", "utf-8", (err) => {
        if (err) {
          console.log(err);
        }
        res.end("Create success");
      });
    });
    req.on("error", (err) => console.log(err));
  }
});

server.listen(port, host);
