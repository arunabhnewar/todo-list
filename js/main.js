// selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// event handlers
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// functions
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // todo div create
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');


    // todo li create
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // check mark button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completedBtn.classList.add('completed-btn');
    todoDiv.appendChild(completedBtn)

    // check delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // append to list
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = '';
};


function deleteCheck(e) {
    const item = e.target;
    // delete todo item
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    // check mark
    else if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    };
};


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
};


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // todo div create
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // todo li create
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // check mark button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
        completedBtn.classList.add('completed-btn');
        todoDiv.appendChild(completedBtn)
        // check delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn);
        // append to list
        todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
