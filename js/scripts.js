// Business Logic
function ToDo(toDo, dueDate, assignTo, check){
  this.toDo = toDo;
  this.dueDate = dueDate;
  this.assignTo = assignTo;
  this.check = check;
}

function ToDoList() {
  this.toDos = {};
  this.currentId = 0
}

ToDoList.prototype.addToDo = function(toDo) {
  toDo.id = this.assignId();
  this.toDos[toDo.id] = toDo;
}

ToDoList.prototype.deleteToDo = function(id) {
  if (this.toDos[id] === undefined) {
    return false;
  }
  delete this.toDos[id];
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

let userList = new ToDoList();


// User Interface

function getText(index) {
  let entryItem = userList.toDos[index];
  let outputText = " " + entryItem.toDo + " [Due on: " + entryItem.dueDate + "] Assigned to: " + entryItem.assignTo;
  return outputText;
}

function displayTasks() {
  let index = userList.currentId;
  let taskClass = "to-do-" + index;
  let taskText = getText(index);
  let listContent = "<li class='" + taskClass + "'><input class='" + taskClass + "' type='checkbox'>" + taskText + "</input></li>"

  $("#main-task-list").append(listContent);

  if (userList.toDos[index].assignTo === "Me") {
    $("#me-task-list").append("<li class='" + taskClass + "'>" + taskText + "</li>");
  } else {
    $("#else-task-list").append("<li class='" + taskClass + "'>" + taskText + "</li>");
  }
}

function submitTask() {
  let taskIn = $("#task-name").val();
    let dateIn =  $("#task-date").val();
    let assignIn = $("#task-assign").val();
    let checkStart = -1;
    let toDoOutput = new ToDo(taskIn, dateIn, assignIn, checkStart);
    userList.addToDo(toDoOutput);
    return userList;
}

$(document).ready(function(event) {
  $("#task-entry").submit(function(event){
    event.preventDefault();
    submitTask();
    displayTasks();
    $(".status").show();
    $('#task-entry input[type="text"]').val('');
  })
  $("#reset-btn").click(function(event) {
    event.preventDefault();
    console.log("reset button is triggering");
     for (let i = 0; i <= userList.currentId; i++) {
       console.log(userList.currentId);
      if ($('input.to-do-' + i).is(":checked")) {
        $('.to-do-' + i).remove();
        userList.deleteToDo(i); 
      }
    }
    
  })
})


