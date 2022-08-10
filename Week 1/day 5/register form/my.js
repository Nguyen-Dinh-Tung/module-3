const http = require("http");
const fs = require("fs");
const qs = require("qs");
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
      let user = qs.parse(data);
      fs.readFile("./register.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }
        datahtml = datahtml.replace("{name}", user.name);
        datahtml = datahtml.replace("{email}", user.email);
        datahtml = datahtml.replace("{phone}", user.phone);
        res.writeHead(200, {"content-text": "text/html"});
        res.write(datahtml);
        res.end();
      });
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
});
sever.listen(3000, "localhost");
