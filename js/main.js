var todoText = document.getElementById("todoText");
var addBtn = document.getElementById("addTodo");
var updateBtn = document.getElementById("updateTodo");
var deleteAll = document.getElementById("deleteAll");
var pendingTasks = document.getElementById("pendingTasks");
var todos = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("todosLists")) != null) {
  todos = JSON.parse(localStorage.getItem("todosLists"));
  displayTodos();
} else {
  var todos = [];
}

function clearCheck(){
  if (todos.length >= 1) {
    deleteAll.removeAttribute("disabled");
    
  } else {
    deleteAll.disabled = true;
  }
}

todoText.onkeyup = function () {
  var todo = todoText.value;
  if (todo.trim() != 0) {
    addBtn.classList.add("active");
    updateBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
    updateBtn.classList.remove("active");
  }
  clearCheck();
};

addBtn.onclick = function addTodo() {
  var todo = todoText.value;
  todos.push(todo);
  localStorage.setItem("todosLists", JSON.stringify(todos));
  displayTodos();
  addBtn.classList.remove("active");
  updateBtn.classList.remove("active");
};

function displayTodos() {
  var cartona = "";
  for (var i = 0; i < todos.length; i++) {
    cartona += `<li class="p-2"><p onclick="updateTodo(${i})" class="mb-0">${todos[i]}</p><span onclick="deleteTodo(${i})" class="py-2 px-3 rounded-3"><i class="fas fa-trash-alt text-white"></i></span></li>`;
  }
  document.getElementById("todoLists").innerHTML = cartona;
  pendingTasks.innerHTML = todos.length;
  todoText.value = "";
  clearCheck();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todosLists", JSON.stringify(todos));
  displayTodos();
}

deleteAll.onclick = function () {
  todos = [];
  localStorage.setItem("todosLists", JSON.stringify(todos));
  displayTodos();
  deleteAll.disabled = true;
};

function updateTodo(index) {
  currentIndex = index;
  todoText.value = todos[currentIndex];
  updateBtn.classList.add("teal");
}

updateBtn.onclick = function () {
  todos[currentIndex] = todoText.value;
  localStorage.setItem("todosLists", JSON.stringify(todos));
  displayTodos();
  addBtn.classList.remove("active");
  updateBtn.classList.remove("active");
  updateBtn.classList.remove("teal");
};