const http = require("http");
const fs = require("fs");
const qs = require("qs");
const sever = http.createServer((req, res) => {
  if (req.method == "GET") {
    res.writeHead("200", {"Content-Type": "text/html"});
    fs.readFile("./todo.html", "utf-8", (err, data) => {
      database = data;
      res.write(data);
      res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const user = qs.parse(data);
      fs.readFile("./display.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }
        datahtml = datahtml.replace("{name}", user.name);
        datahtml = datahtml.replace("{email}", user.email);
        datahtml = datahtml.replace("{password}", user.password);
        res.writeHead("200", {"content-type": "text/html"});
        res.write(datahtml);
        return res.end();
      });
    });
    req.on("error", () => {
      console.log("error");
    });
  }
});
sever.listen(3000, "localhost");
