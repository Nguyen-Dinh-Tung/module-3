let input = document.querySelector("#input");
let btn = document.querySelector("#btn");
let result = document.querySelector(".result");
btn.addEventListener("click", handle);
function handle(callback) {
  let value = input.value;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (value > 0) {
        render(value);
        value--;
        resolve();
      } else {
        reject("value < 0");
      }
    }, 2000);
  });
}
function render(value) {
  result.innerHTML = value;
}
handle
.catch((e) => render(e));
