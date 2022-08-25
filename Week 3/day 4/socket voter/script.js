const socket = io("http://localhost:3000");

let name = prompt("What is your name?");
let btn = document.querySelector("#btn-sent");
let blogMessage = document.querySelector("#blog-message");

btn.addEventListener("click", btnClick);

function btnClick() {
  let message = document.querySelector("#message").value;
  let dataSent = {
    name: name,
    message: message,
  };
  socket.emit("sent-message", dataSent);
}
socket.on("comment", (data) => {
  blogMessage.innerHTML += `<li>${data}</li>`;
});
