const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const server = http.createServer((req, res) => {
  var parseUrl = url.parse(req.url, true);
  var queryStringObject = parseUrl.query;

  res.end("Hello Node Js");
  console.log(queryStringObject);
});
server.listen(3000, "localhost", () => {
  console.log("3000 localhost");
});
