import { useState } from 'react'
import { atom, useAtom } from 'jotai'

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

function App() {

  return (
    <div className="App">
      <Counter1 />
      <Counter2 />
      <hr />
      <PersonComponent />
    </div>
  )
}

export default App
