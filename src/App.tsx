import { useState } from 'react'
import { proxy, useSnapshot } from 'valtio'
import TodoApp from './TodoApp'

const state = proxy({
  count1: 0,
  count2: 0
})

const Count1 = () => {
  const snap = useSnapshot(state)
  const inc = () => ++state.count1

  return (
    <>
      count1: {snap.count1} <button onClick={inc}>+1</button>
    </>
  )
}

const Count2 = () => {
  const snap = useSnapshot(state)
  const inc = () => ++state.count2

  return (
    <>
      count2: {snap.count2} <button onClick={inc}>+1</button>
    </>
  )
}

function App() {

  return (
    <div className="App">
      <h1>Count app</h1>
      <Count1 />
      <br />
      <Count2 />
      <hr />
      <h1>Todo App</h1>
      <TodoApp />
    </div>
  )
}

export default App
