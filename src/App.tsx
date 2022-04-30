import { atom, Provider, useAtom } from 'jotai'
import { NewTodo, TodoList } from './TodoList'
import { NewTodo as AtomNewTodo, TodoList as AtomTodoList } from './AtomsInAtomTodoList'

/**
 * -------- example 1 --------
 * Jotai 的基本使用 atom() 函数 & useAtom() hook
 */
const countAtom = atom(0)

const Counter1 = () => {
  const [count, setCount] = useAtom(countAtom)

  return (
    <>
      <h1>count1: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </>
  )
}

const Counter2 = () => {
  const [count, setCount] = useAtom(countAtom)

  return (
    <>
      <h1>count2: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </>
  )
}

/**
 * -------- example 2 --------
 * Jotai read函数 派生 atom & 自动追踪依赖
 */
const firstNameAtom = atom('React')
const lastNameAtom = atom('Native')
const ageAtom = atom(19)

// Jotai 中派生 atom 的概念
// get => {}  read 函数， 可以获取到其它原子的值
// 如果 firstNameAtom | lastNameAtom | ageAtom 发生变化，派生的 personAtom 也会自动变化
// 这称之为 依赖追踪，Jotai帮我们自动进行管理
const personAtom = atom(get => ({
  firstName: get(firstNameAtom), // get(firstNameAtom) 获取 firstNameAtom 的值
  lastName: get(lastNameAtom),
  age: get(ageAtom)
}))

const PersonComponent = () => {
  const [person] = useAtom(personAtom)

  return (
    <>
    firstName: <h3>{person.firstName}</h3>
    lastName: <h3>{person.lastName}</h3>
    age: <h3>{person.age}</h3>
    </>
  )
}

/**
 * -------- example 3 --------
 * atom则为属性的方式 + 派生
 */
const countAtom1 = atom<number>(0)
const countAtom2 = atom<number>(0)
// 这里直接返回一个值
const totalAtom = atom(get => 
  get(countAtom1) + get(countAtom2)
)
// 注意这里的 ts 类型 -  typeof countAtom1
const Counter = ({ someCountAtom }: {someCountAtom: typeof countAtom1}) => {
  const [count, setCount] = useAtom(someCountAtom)
  const inc = () => setCount(c => c + 1)
  return (
    <>count: {count}  <button onClick={inc}>+1</button></>
  )
}
const Total = () => {
  const [total] = useAtom(totalAtom)
  console.log('total', total)

  return (
    <>
      total: {total}
    </>
  )
}


function App() {

  return (
    <div className="App">
      <h1>全局状态</h1>
      <Counter1 />
      <Counter2 />
      <hr />
      <h1>派生atom</h1>
      <PersonComponent />
      <hr />
      <div>
        <h1>派生组件</h1>
        (<Counter someCountAtom={countAtom1} />) + 
        (<Counter someCountAtom={countAtom2} />) =
        (<Total />)
      </div>
      <hr />
      <Provider>
        <h1>Provider 对store进行隔离 区域1</h1>
        <Counter someCountAtom={countAtom1} />
        <Counter someCountAtom={countAtom2} />
      </Provider>
      <Provider>
        <h1>Provider 对store进行隔离 区域2</h1>
        <Counter someCountAtom={countAtom1} />
        <Counter someCountAtom={countAtom1} />
      </Provider>
      <hr />
      <h1>TODO List App</h1>
      <TodoList />
      <NewTodo />
      <hr />
      <h1>使用Atoms-In-Atom模式完成的TodoList App😎</h1>
      <AtomTodoList />
      <AtomNewTodo />
    </div>
  )
}

export default App
