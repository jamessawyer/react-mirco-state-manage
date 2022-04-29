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

function App() {

  return (
    <div className="App">
      <Counter1 />
      <Counter2 />
    </div>
  )
}

export default App
