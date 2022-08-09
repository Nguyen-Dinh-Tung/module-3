const axios = require("axios");
async function getDate() {
  let json = await axios.get("http://jsonplaceholder.typicode.com/posts");
  return json.data;
}
getDate().then((result) => console.log(result));
