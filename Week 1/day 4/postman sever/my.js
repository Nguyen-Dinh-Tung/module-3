const http = require("http");
const sever = http
  .createServer((req, res) => {
    let txt = "";
    if (req.url == "/login") {
      txt = "login success";
    } else {
      text = "fail";
    }
    res.end(txt);
  })
  .listen(3000, "localhost");
