function downLoad(url, callback) {
  setTimeout(() => {
    callback(url);
  }, 1000);
  console.log(url);
}
function process(picture) {
  console.log(`prosuccess ${picture}`);
}
let url = "https://www.javascripttutorial.net/pic.jpg";

downLoad(url, process);
