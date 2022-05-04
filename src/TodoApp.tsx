import { proxy, useSnapshot } from 'valtio'
import { nanoid } from 'nanoid'
import { KeyboardEvent, memo, useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  done: boolean;
}

const state = proxy<{todos: Todo[]}>({
  todos: []
})

const createTodo = (title: string) => {
  // 直接进行 mutation
  state.todos.push({
    id: nanoid(),
    title,
    done: false
  })
}

const removeTodo = (id: string) => {
  const idx = state.todos.findIndex(todo => todo.id === id)
  state.todos.splice(idx, 1)
}

const toggleTodo = (id: string) => {
  const idx = state.todos.findIndex(todo => todo.id === id)
  state.todos[idx].done = !state.todos[idx].done
}

const TodoItem = ({id, title, done}: Todo) => {
  useEffect(() => {
    console.log('TodoItem render')
  })
  return (
    <div>
      <input type="checkbox" value={title} onChange={() => toggleTodo(id)} />
      <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{title}</span>
      <button onClick={() => removeTodo(id)}>删除</button>
    </div>
  )
}
const MemoedTodoItem = memo(TodoItem)

const TodoList = () => {
  // 使用快照 获取 immutable 对象
  const { todos } = useSnapshot(state)

  useEffect(() => {
    console.log('TodoList render')
  })

  return (
    <div>
      {todos.map(todo => (
        <MemoedTodoItem key={todo.id} {...todo} />
      ))}
    </div>
  )
}

const NewTodo = () => {
  const [text, setText] = useState('')

  const addTodo = () => {
    if (!text) return
    createTodo(text)
    setText('')
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={addTodo}>添加</button>
    </>
  )
}

/**
 * 当我们 toggleTodo 时， TodoItem 会重渲染，而 TodoList 也会重渲染
 * 这是可以进行优化的地方
 */

export default () => (
  <>
    <NewTodo />
    <TodoList />
  </>
)