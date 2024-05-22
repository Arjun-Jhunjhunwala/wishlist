
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];

function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (para) {
        const number = Math.random() * 16 | 0, 
            randomNumber = para == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}

addTodoButton.addEventListener("click",(e) => {
    e.preventDefault();
    todo = todoInput.value;
    if (todo.length>0){
        todoList.push({id: uuid(), todo, isCompleted: false})
    }
    renderTodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    todoInput.value="";
})

showTodos.addEventListener("click", (e) => {
    let key=e.target.dataset.key;
    let delTodokey=e.target.dataset.todokey;
    todoList=todoList.map(todo => todo.id===key?{...todo,isCompleted: !todo.isCompleted}:todo);
    todoList=todoList.filter(todo => todo.id!==delTodokey);
    renderTodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    console.log(todoList);
})

function renderTodoList(todoList){
    console.log(todoList);
    showTodos.innerHTML=todoList.map(({id,todo,isCompleted}) => `
    <div class="relative todo">
        <input class = "t-pointer t-checkbox" id = "item-${id}" type = "checkbox" data-key = ${id} ${isCompleted?"checked":""}>
        <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted? "checked-todo":""}" data-key=${id}>${todo}
        <button class="absolute right-0 button cursor">
            <span class="del-btn material-symbols-outlined" data-todokey=${id}>delete</span>
        </button>
    </div>
`);
}

renderTodoList(todoList);

