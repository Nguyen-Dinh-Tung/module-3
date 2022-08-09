const axios = require("axios");
async function getAllUser() {
  let result = await axios.get("https://jsonplaceholder.typicode.com/users");
  return result;
}
getAllUser().then((result) => console.log(result));
