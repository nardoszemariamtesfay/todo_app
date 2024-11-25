const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoActions);
filterOption.addEventListener("change", filterTodo);

// Add a new task
function addTodo(event) {
    event.preventDefault(); // Prevent form submission

    // Ensure input is not empty
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create todo item
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoText;
    todoDiv.appendChild(newTodo);

    // Add buttons
    todoDiv.appendChild(createButton('<i class="fas fa-check-circle"></i>', "complete-btn"));
    todoDiv.appendChild(createButton('<i class="fas fa-edit"></i>', "edit-btn"));
    todoDiv.appendChild(createButton('<i class="fas fa-trash"></i>', "trash-btn"));

    todoList.appendChild(todoDiv);

    // Save to local storage
    saveLocalTodos(todoText);

    // Clear input field
    todoInput.value = "";
}

































// Handle complete, edit, and delete actions
function handleTodoActions(e) {
    const item = e.target;
    const todo = item.parentElement;

    // Complete Task
    if (item.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
        updateLocalTodos(todo); // Update completion status in localStorage
    }

    // Edit Task
    if (item.classList.contains("edit-btn")) {
        const todoText = todo.querySelector(".todo-item");
        if (todoText.isContentEditable) {
            todoText.contentEditable = "false";
            item.innerHTML = '<i class="fas fa-edit"></i>';
            updateLocalTodos(todo); // Update task content in localStorage
        } else {
            todoText.contentEditable = "true";
            item.innerHTML = '<i class="fas fa-save"></i>';
            todoText.focus();
        }
    }

    // Delete Task
    if (item.classList.contains("trash-btn")) {
        removeLocalTodos(todo);
        todo.remove();
    }
}















































// Get todos from local storage and display them
function getLocalTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo) {
        if (!todo.text) {
            console.error("Missing text for todo:", todo);
            return; // Skip this todo if it's invalid
        }

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.setAttribute("data-id", todo.id); // Set the unique ID

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo.text;
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }
        todoDiv.appendChild(newTodo);

        todoDiv.appendChild(createButton('<i class="fas fa-check-circle"></i>', "complete-btn"));
        todoDiv.appendChild(createButton('<i class="fas fa-edit"></i>', "edit-btn"));
        todoDiv.appendChild(createButton('<i class="fas fa-trash"></i>', "trash-btn"));

        todoList.appendChild(todoDiv);
    });
}
