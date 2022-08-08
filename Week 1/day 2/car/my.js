let input = document.querySelector("#input");
let btn = document.querySelector("#btn");
let result = document.querySelector(".result");
btn.addEventListener("click", handle);
function handle() {
  let value = input.value;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value > 5) {
        resolve("đủ tiền mua xe");
      } else {
        reject("không đủ tiền mua xe");
      }
    }, 2000);
  });
  promise.then((value) => render(value)).catch((error) => render(error));
}
function render(value) {
  result.innerHTML = value;
}
