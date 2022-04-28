import create from 'zustand'

export type Todo = {
  id: number,
  title: string,
  done: boolean,
}

export type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

let nextId = 0

const useTodoStore = create<TodoStore>(set => ({
  todos: [] as Todo[],
  // 使用 immutable 方式 返回新的对象
  addTodo: (title: string) => set((prev) => ({
    todos: [...prev.todos, {id: ++nextId, title, done: false}]
  })),
  removeTodo: (id: number) => set(prev => ({
    todos: prev.todos.filter(todo => todo.id !== id),
  })),
  toggleTodo: (id: number) => set(prev => ({
    todos: prev.todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo),
  }))

}))

export default useTodoStore
