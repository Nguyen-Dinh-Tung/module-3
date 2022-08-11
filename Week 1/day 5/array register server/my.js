const http = require("http");
const fs = require("fs");
const qs = require("qs");
const User = require("./User");
let arr = [];
const sever = http.createServer((req, res) => {
  let method = req.method;
  if (method == "GET") {
    fs.readFile("./index.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, {"content-text": "text/html"});
      res.write(data);
      res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let info = qs.parse(data);
      let user = new User(info.name, info.email, info.phone);
      arr.push(user);
      console.log(arr);
      fs.readFile("./index.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, {"content-text": "text/html"});
        res.write(datahtml);
        res.end();
      });
    });
    res.on("error", (err) => {
      console.log(err);
    });
  }
});
sever.listen(3000, "localhost");
