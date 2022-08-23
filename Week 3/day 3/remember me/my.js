const http = require("http");
const fs = require("fs");
const qs = require("qs");
const port = 3000;
const host = "localhost";
const url = require("url");
const mysql = require("mysql");
const cookie = require("cookie");
const escapeHtml = require("escape-html");

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true, true).query;
  if (query && query.remember && query.name) {
    res.setHeader(
      "set-cookie",
      cookie.serialize("name", String(query.name), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.statusCode = 302;
    res.setHeader("location", req.headers.referer || "/");
    res.end();
    return;
  }
  var cookies = cookie.parse(req.headers.cookie || "");
  var name = cookies.name;
  res.setHeader("content-type", "text/html ; charset=UTF-8");
  if (name) {
    res.write('<form method="GET">');
    res.write("<p>Welcome back, <b>" + escapeHtml(name) + "</b>!</p>");
    res.write(
      '<input placeholder="enter your name" name="name" value="' +
        escapeHtml(name) +
        '"></br>'
    );
    res.write(
      '<input type="checkbox" id="remember" name="remember" value="true">\n' +
        '<label for="vehicle2"> Remember me</label><br>'
    );
    res.write('<input type="submit" value="Set Name">');
  } else {
    res.write('<form method="GET">');
    res.write("<p>Hello, new visitor!</p>");
    res.write(
      '<input placeholder="enter your name" name="name" value=""></br>'
    );
    res.write(
      '<input type="checkbox" id="remember" name="remember" value="true">\n' +
        '<label for="vehicle2"> Remember me</label><br>'
    );
    res.write('<input type="submit" value="Set Name">');
    res.end("</form>");
  }
});
server.listen(port, host);
