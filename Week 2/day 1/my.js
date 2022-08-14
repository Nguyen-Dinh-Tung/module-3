const http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var server = http.createServer(function (req, res) {
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function (end) {
    buffer += decoder.end();
    res.end("Hello Node Js");
    console.log(buffer);
  });
});
server.listen(3000, "localhost");
