const host = "http://localhost:3000";
const socket = io(host);
import $ from "jquery";
let index = 0;
$("#todolistForm").submit((e) => {
  e.preventDefault();
  const task = $("#task").val();
  socket.emit("addtask", task);
  insertTask(task, index);
  index++;
  $("#task").val("").focus();
  return false;
});
socket.on("addTask", (data) => {
  insertTask(data.task, data.index);
});
function insertTask(task, index) {
  $("#todolist").append(
    `<li><a class="delete" href="#" data-index="' + index + '">✘</a> ' + task  + '</li>`
  );
}
socket.on("updateTask", function (todolist) {
  $("#todolist").empty();
  todolist.forEach(function (task, index) {
    insertTask(task, index);
    console.log(index);
  });
});
