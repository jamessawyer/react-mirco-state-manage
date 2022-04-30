import { atom, PrimitiveAtom, useAtom } from "jotai";
import { memo, useCallback, useState } from "react";

// 不再使用 id
type Todo = {
  title: string;
  done: boolean;
}

// TodoAtom 是一个 atom config
type TodoAtom = PrimitiveAtom<Todo>

// 使用上面的 TodoAtom 创建 todoAtomsAtom config
// atom config数组
const todoAtomsAtom = atom<TodoAtom[]>([])

const TodoItem = ({
  todoAtom,
  remove
}: {
  todoAtom: TodoAtom;
  remove: (todoAtom: TodoAtom) => void;
}) => {
  // 使用 atom config 提供给的 方法改变 todo 状态
  // 因此 TodoItem 组件不再需要传入 toggleAtom 方法
  const [todo, setTodo] = useAtom(todoAtom)

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => setTodo(prev => ({ ...prev, done: !prev.done }))}
      />
      <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>{todo.title}</span>
      <button onClick={() => remove(todoAtom)}>删除</button>
    </div>
  )
}

const MemoedTodoItem = memo(TodoItem)

export const TodoList = () => {
  const [todoAtoms, setTodoAtoms] = useAtom(todoAtomsAtom)

  const remove = useCallback(
    (todoAtom: TodoAtom) => setTodoAtoms(
      // 这里不再依赖 id 去判定删除的是哪一个对象 直接用对象去判定
      prev => prev.filter(item => item !== todoAtom)
    ),
    [setTodoAtoms]
  )

  return (
    <div>
      {todoAtoms.map(todoAtom => (
        <MemoedTodoItem
          key={`${todoAtom}`}
          todoAtom={todoAtom}
          remove={remove}
        />
      ))}
    </div>
  )
}

export const NewTodo = () => {
  const [, setTodoAtoms] = useAtom(todoAtomsAtom)
  const [text, setText] = useState('')

  const onClick = () => {
    setTodoAtoms(prev => [
      ...prev,
      atom<Todo>({title: text, done: false}) // 这里添加的是 atom config
    ])
    setText('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!text) return
    if (e.code === 'Enter') {
      setTodoAtoms(prev => [
        ...prev,
        atom<Todo>({title: text, done: false}) // 这里添加的是 atom config
      ])
      setText('')
    }
  }



  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick} disabled={!text}>添加</button>
    </div>
  )
}