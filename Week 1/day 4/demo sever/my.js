const http = require("http");
const sever = http.createServer((req, res) => {
  res.write("<h1>Test tùng phich</h1>");
  res.end();
});
sever.listen(3000, "127.0.0.1");
