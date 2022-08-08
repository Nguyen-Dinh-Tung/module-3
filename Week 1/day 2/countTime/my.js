let input = document.querySelector("#input");
let btn = document.querySelector("#btn");
let result = document.querySelector(".result");
btn.addEventListener("click", handle);
function handle() {
  let value = input.value;
  let promise = new Promise((resolve, reject) => {
    if (value > 0) {
      resolve(value);
    } else {
      reject("value < 0");
    }
  });

  promise
    .then((value) => {
      setInterval(() => {
        if (value > 0) {
          render(value);
          value--;
        } else {
          return;
        }
      }, 2000);
    })
    .catch((e) => console.log(e));
}
function render(value) {
  result.innerHTML = value;
}
