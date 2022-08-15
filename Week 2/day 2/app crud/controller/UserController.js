const User = require("../class/User");

class UserController {
  createUser(name, id) {
    let user = new User(name, id);
  }
}
let userController = new UserController();
