interface ITodo {
    id: string
    title: string
    status: boolean
}

interface ITodos {
    todos: ITodo[]
    addTodos(data: ITodo): ITodo[]
    getTodos(): ITodo[]
    toggleStatus(id: string): boolean
    deleteTodo(id: string): boolean
}

class Todo implements ITodo {
    id: string
    title: string
    status: boolean

    constructor(title: string) {
        this.id = Math.random().toString().split('.')[1]
        this.title = title
        this.status = false
    }

    set setTitle(title: string) {
        this.title = title
    }

    set setStatus(status: boolean) {
        this.status = status
    }

    getTodo() {
        const { id, title, status } = this

        return {
            id,
            title,
            status
        }
    }
}

class Todos implements ITodos {
    todos: ITodo[]

    constructor() {
        this.todos = []
    }

    addTodos(data: ITodo) {
        this.todos.push(data)

        return this.todos
    }

    getTodos(): any {
        return this.todos
    }

    toggleStatus(id: string): boolean {
        const todos = this.todos.map(i => {
            if (i.id === id) {
                i.status = !i.status
            }

            return i
        })
        this.todos = todos

        return true
    }

    deleteTodo(id: string | null) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        return true
    }
}

class Controller extends Todos {
    todoInput: HTMLInputElement
    submitButton: HTMLButtonElement
    listTodos: HTMLUListElement
    itemTodo: HTMLCollectionOf<HTMLLIElement>
    itemButton: HTMLCollectionOf<HTMLButtonElement>

    constructor() {
        super()
        this.todoInput = document.querySelector('#input-title') as HTMLInputElement
        this.submitButton = document.querySelector('#button-submit') as HTMLButtonElement
        this.listTodos = document.querySelector('#list-todos') as HTMLUListElement
        this.itemTodo = document.getElementsByClassName('main-text') as HTMLCollectionOf<HTMLLIElement>
        this.itemButton = document.getElementsByClassName('action') as HTMLCollectionOf<HTMLButtonElement>

        this.submit()
        this.init()
    }

    private init() {
        this.setListTodos()
        this.clickItems()
    }

    private clickItems() {
        for (let index = 0; index < this.itemTodo.length; index++) {
            const element = this.itemTodo[index];
            const button = this.itemButton[index];

            button.addEventListener('click', this.handlerDelete.bind(this))
            element.addEventListener('click', this.handlerItem.bind(this))
        }
    }

    private handlerDelete(e: Event) {
        e.preventDefault()

        const el = (<Element>e.currentTarget).querySelector('button')
        const id = el!.getAttribute('data-id')

        this.deleteTodo(id)
        this.init()
    }

    private handlerItem(e: Event) {
        e.preventDefault()

        const el = (<Element>e.currentTarget).querySelector('input')

        const id = el!.id

        this.toggleStatus(id)
        this.init()
    }

    private clearForm() {
        this.todoInput.value = ''
    }

    private setListTodos() {

        const todos = this.getTodos()

        this.listTodos.innerHTML = ''
        let htmlElements = ''
        todos.forEach((todo: any) => {
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
        this.listTodos.innerHTML = htmlElements
    }

    private validation(value: string): boolean {
        if (value === '') {
            return false
        }

        return true
    }

    private submit() {
        this.submitButton.addEventListener('click', this.submitHandler.bind(this))
    }

    private submitHandler(e: Event) {
        e.preventDefault()

        const title = this.todoInput.value

        if (this.validation(title)) {
            const todo = new Todo(title)
            this.addTodos(todo.getTodo())

            this.clearForm()
            this.init()
        } else {
            alert("You need to input something there!")
        }
    }
}

const controller = new Controller