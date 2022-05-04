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

/**
 * 改进版：每个TodoItem 都用 useSnapshot 找到相应的todo
 * 这样只有 id, title, done 发生变化时才会重渲染组件
 */
const TodoItem = ({ id }: {id: string}) => {
  const todoState = state.todos.find(todo => todo.id === id)

  if (!todoState) {
    throw Error('Todo item not found')
  }

  const {title, done} = useSnapshot(todoState)

  useEffect(() => {
    console.log('New TodoItem render')
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
  // 这里只需要ids
  const todoIds = todos.map(todo => todo.id)

  useEffect(() => {
    console.log('New TodoList render')
  })

  return (
    <div>
      {todoIds.map(todoId => (
        <MemoedTodoItem key={todoId} id={todoId} />
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