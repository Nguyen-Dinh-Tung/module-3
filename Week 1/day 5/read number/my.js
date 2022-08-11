const http = require("http");
const fs = require("fs");
const qs = require("qs");
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
      let read = qs.parse(data);
      let str = read.number;
      let number = +read.number;
      console.log(number);
      let result = "";
      let arr = [
        "Không ",
        "Một ",
        "Hai ",
        "Ba ",
        "Bốn ",
        "Năm ",
        "Sáu ",
        "Bảy ",
        "Tám ",
        "Chín ",
      ];
      let strTen = "Mười ";
      let strOne = "Mốt ";
      let strThree = "Mươi ";
      if (number >= 0 && number <= 9) {
        result = arr[number];
      }
      if (number == 10) {
        number = strTen;
      }
      if (number > 10 && number <= 19) {
        for (let value in arr) {
          if (str[1] == value) {
            result += strTen + arr[value];
          }
        }
      }
      if (number > 19 && number < 100) {
        if (str[1] == 0) {
          result = arr[+str[0]] + strThree;
        }
        if (str[1] == 1) {
          result = arr[+str[0]] + strThree + strOne;
        }
        if (str[1] != 0 && str[1] != 1) {
          for (let value of str) {
            for (let value2 in arr) {
              if (value == value2) {
                result += arr[value2];
              }
            }
          }
        }
      }
      fs.readFile("./index.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }
        datahtml = datahtml.replace("{result}", result);
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
