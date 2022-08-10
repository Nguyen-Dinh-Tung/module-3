const http = require("http");
const fs = require("fs");
const qs = require("qs");
const sever = http.createServer((req, res) => {
  if (req.method == "GET") {
    fs.readFile("./caculator.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead("200", {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const dt = qs.parse(data);
      fs.readFile("./caculator.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }
        let number1 = +dt.number1;
        let number2 = +dt.number2;
        let result;
        if (dt.handle == "sub") {
          result = number1 - number2;
        }
        if (dt.handle == "plus") {
          result = number1 * number2;
        }
        if (dt.handle == "sum") {
          result = number1 + number2;
        }
        if (dt.handle == "device") {
          result = number1 / number2;
        }
        datahtml = datahtml.replace(`{result}`, result);

        res.writeHead("200", {"content-type": "text/html"});
        res.write(datahtml);
        res.end();
      });
    });
  }
});
sever.listen(3000, "localhost");
