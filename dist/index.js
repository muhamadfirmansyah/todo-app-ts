"use strict";
class Todo {
    constructor(title) {
        this.id = Math.random().toString().split('.')[1];
        this.title = title;
        this.status = false;
    }
    set setTitle(title) {
        this.title = title;
    }
    set setStatus(status) {
        this.status = status;
    }
    getTodo() {
        const { id, title, status } = this;
        return {
            id,
            title,
            status
        };
    }
}
class Todos {
    constructor() {
        this.todos = [];
    }
    addTodos(data) {
        this.todos.push(data);
        return this.todos;
    }
    getTodos() {
        return this.todos;
    }
    toggleStatus(id) {
        const todos = this.todos.map(i => {
            if (i.id === id) {
                i.status = !i.status;
            }
            return i;
        });
        this.todos = todos;
        return true;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        return true;
    }
}
class Controller extends Todos {
    constructor() {
        super();
        this.todoInput = document.querySelector('#input-title');
        this.submitButton = document.querySelector('#button-submit');
        this.listTodos = document.querySelector('#list-todos');
        this.itemTodo = document.getElementsByClassName('main-text');
        this.itemButton = document.getElementsByClassName('action');
        this.submit();
        this.setListTodos();
        this.clickItems();
    }
    init() {
        this.setListTodos();
        this.clickItems();
    }
    clickItems() {
        for (let index = 0; index < this.itemTodo.length; index++) {
            const element = this.itemTodo[index];
            const button = this.itemButton[index];
            button.addEventListener('click', this.handlerDelete.bind(this));
            element.addEventListener('click', this.handlerItem.bind(this));
        }
    }
    handlerDelete(e) {
        e.preventDefault();
        const el = e.currentTarget.querySelector('button');
        const id = el.getAttribute('data-id');
        this.deleteTodo(id);
        this.init();
    }
    handlerItem(e) {
        e.preventDefault();
        const el = e.currentTarget.querySelector('input');
        const id = el.id;
        this.toggleStatus(id);
        this.init();
    }
    clearForm() {
        this.todoInput.value = '';
    }
    setListTodos() {
        const todos = this.getTodos();
        this.listTodos.innerHTML = '';
        let htmlElements = '';
        todos.forEach((todo) => {
            htmlElements += `<li class="item-todo">
                <div class="main-text">
                    <input type="checkbox" name="" id="${todo.id}" ${todo.status && 'checked'}>
                    <label for="${todo.id}">${todo.title}</label>
                </div>
                <div class="action">
                    <button data-id="${todo.id}">delete</button>
                </div>
            </li>`;
        });
        this.listTodos.innerHTML = htmlElements;
    }
    validation(value) {
        if (value === '') {
            return false;
        }
        return true;
    }
    submit() {
        this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    }
    submitHandler(e) {
        e.preventDefault();
        const title = this.todoInput.value;
        if (this.validation(title)) {
            const todo = new Todo(title);
            this.addTodos(todo.getTodo());
            this.clearForm();
            this.init();
        }
        else {
            alert("You need to input something there!");
        }
    }
}
const controller = new Controller;
