import { atom, useAtom } from "jotai";
import { memo, useCallback, useState } from "react";
import { nanoid } from 'nanoid';

type Todo = {
  id: string;
  title: string;
  done: boolean;
}

const todosAtom = atom<Todo[]>([])

const TodoItem = ({
  todo, removeTodo, toggleTodo
}: {
  todo: Todo,
  removeTodo: (id: string) => void,
  toggleTodo: (id: string) => void
}) => {
  return (
    <div>
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>{todo.title}</span>
      <button onClick={() => removeTodo(todo.id)}>删除</button>
    </div>
  )
}

// 使用 `memo` 进行性能优化
// 只有传入的属性 todo removeTodo toggleTodo 发生变化时，才会重渲染
const MemoedTodoItem = memo(TodoItem)


export const TodoList = () => {
  const [todos, setTodos] = useAtom(todosAtom)
  const removeTodo = useCallback(
    (id: string) => setTodos(
      (prev) => prev.filter(item => item.id !== id)
    ),
  [setTodos])
  const toggleTodo = useCallback(
    (id: string) => setTodos(
      prev => prev.map(item => item.id === id ? { ...item, done: !item.done} : item)
    ),
    [setTodos]
  )

  return (
    <div>
      {todos.map(todo => (
        <MemoedTodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  )
}

export const NewTodo = () => {
  // NewTodo 为了简洁 使用了 todosAtom
  // 这样当 todosAtom 更新时， 会导致 NewTodo 重渲染
  // 如果为了性能 可以使用 `useUpdateAtom`
  const [, setTodos] = useAtom(todosAtom)
  const [text, setText] = useState('')

  const onClick = () => {
    setTodos(prev => [...prev, { id: nanoid(), title: text, done: false }])
    setText('')
  }

  // React 中如何定义 onKeydown 事件
  // https://felixgerschau.com/react-typescript-onkeydown-event-type/
  // https://www.kindacode.com/article/react-typescript-handling-keyboard-events/
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!text) return
    if (e.code === 'Enter') {
      setTodos(prev => [...prev, { id: nanoid(), title: text, done: false }])
      setText('')
    }
  }

  return (
    <div>
      <input
        type="text" 
        value={text}
        onChange={e => setText(e.target.value)} onKeyDown={onKeyDown}
      />
      <button onClick={onClick} disabled={!text}>添加</button>
    </div>
  )
}