const fs = require("fs");
const User = require("../class/User");
const qs = require("qs");
class ManagerController {
  listUser = [];
  showPage(req, res, pathName) {
    this.getTemplate(req, res, pathName);
  }
  showManagerPage(req, res, pathName) {
    fs.readFile(pathName, "utf-8", async (err, data) => {
      let dataJson = JSON.parse(await this.readFile());
      let html = "";
      dataJson.forEach((element, index) => {
        let role = "";
        if (element.role == 1) {
          role = "user";
        } else {
          role = "admin";
        }
        html += `<tr>`;
        html += `<td>${index + 1}</td>`;
        html += `<td>${element.name}</td>`;
        html += `<td>${role}</td>`;
        html += `<td><a href="/delete?${index}"><button type="submit">Xóa</button></a></td>`;
        html += `<td><a href="/edit?${index}"><button type="submit">Sửa</button></a></td>`;
        html += `</tr>`;
      });
      data = data.replace("{list-user}", html);
      res.writeHead(200, {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  }
  getTemplate(req, res, pathName) {
    fs.readFile(pathName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  }

  createUser(id, name, role) {
    let user = new User(name, id, role);
    this.listUser.push(user);
  }
  deleteAcount(req, res, pathName, index) {
    fs.readFile(pathName, "utf-8", async (err, data) => {
      let dataJson = JSON.parse(await this.readFile());
      dataJson.splice(+index, 1);
      let dataLast = JSON.stringify(dataJson);
      fs.writeFile("./data.json", dataLast, (err) => {
        console.log(err);
      });
      res.setHeader("Cache-Control", "no-store");
      res.writeHead(301, {location: "/manager"});
      this.showManagerPage(req, res, pathName);
      res.end();
    });
  }
  showEditUser(req, res, pathName, index) {
    fs.readFile(pathName, "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, {"content-type": "text/html"});
      res.write(data);
      res.end();
    });
  }
  editUser(req, res, index, pathName) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let user = qs.parse(data);
      let dataJson = JSON.parse(await this.readFile());
      dataJson[index].name = user.name;
      let dataLast = JSON.stringify(dataJson);
      fs.writeFile("./data.json", dataLast, (err) => {
        console.log(err);
      });
      res.writeHead(301, {location: "/manager"});
      this.showManagerPage(req, res, pathName);
      res.end();
    });
  }
  writeToJson(req, res, path) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let user = qs.parse(data);
      let dataRFJson = await this.readFile();
      let dataJson = JSON.parse(dataRFJson);
      dataJson.push(user);
      dataJson.forEach((element, index) => {
        let user = new User(index + 1, element.name, element.role);
        this.listUser.push(user);
      });
      let dataLast = JSON.stringify(dataJson);
      fs.writeFile("./data.json", dataLast, (err) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(301, {location: "/register"});
        res.end();
      });
    });
  }
  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
module.exports = ManagerController;
