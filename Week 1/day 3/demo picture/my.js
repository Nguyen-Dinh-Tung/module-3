const axios = require("axios");
async function getPicture() {
  let result = await axios.get(
    "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
  );
  return result;
}
getPicture().then((result) => console.log(result));
