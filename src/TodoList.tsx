import React, { useState } from "react"
import useTodoStore, { Todo, TodoStore } from "./useTodoStore"

const selectRemoveTodo = (state: TodoStore) => state.removeTodo
const selectToggleTodo = (state: TodoStore) => state.toggleTodo

const TodoItem = ({ todo }: { todo: Todo}) => {
  const removeTodo = useTodoStore(selectRemoveTodo)
  const toggleTodo = useTodoStore(selectToggleTodo)

  return (
    <div>
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      <span style={{textDecoration: todo.done ? "line-through" : "none"}}>{todo.title}</span>
      <button onClick={() => removeTodo(todo.id)}>删除</button>
    </div>
  )
}

const MemoedTodoItem = React.memo(TodoItem)

const selectTodos = (state: TodoStore) => state.todos

const TodoList = () => {
  const todos = useTodoStore(selectTodos)

  return (
    <div>
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

const selectAddTodo = (state: TodoStore) => state.addTodo

const NewTodo = () => {
  const addTodo = useTodoStore(selectAddTodo)
  const [val, setVal] = useState('')

  const onClick = () => {
    addTodo(val)
    setVal('')
  }

  // React 中如何定义 onKeydown 事件
  // https://felixgerschau.com/react-typescript-onkeydown-event-type/
  // https://www.kindacode.com/article/react-typescript-handling-keyboard-events/
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key down', e)
    if (!val) return
    if (e.code === 'Enter') {
      addTodo(val)
      setVal('')
    }
  }
  
  return (
    <>
      <input type="text" value={val} onKeyDown={onKeyDown} onChange={(e) => setVal(e.target.value)}/>
      <button onClick={onClick} disabled={!val}>Add new Todo</button>
    </>
  )
}

const TodoApp = () => (
  <>
    <NewTodo />
    <TodoList />
  </>
)

export default TodoApp
