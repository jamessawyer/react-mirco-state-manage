import { useEffect, useState } from 'react'

const createContainer = (initialState: unknown) => {
  let state = initialState
  const getState = () => state
  const setState = (nextState: unknown) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState
  }

  return { getState, setState }
}

let count = 0

// 为了解决 Counter1 & Counter2 中 state 不能同步更新的问题
// 使用一个set 将所有的 setState 收集起来，然后点击时使用 forEach 调用所有 setStateFunctions 中的 setState
// 但是这样会出现大量重复性的代码，可以使用订阅的方式去解决这个问题
let setStateFunctions = new Set<(count: number) => void>()

const Counter1 = () => {
  const [state, setState] = useState(count)

  useEffect(() => {
    setStateFunctions.add(setState)
    return () => {
      setStateFunctions.delete(setState)
    }
  }, [])

  const inc = () => {
    count += 1
    setStateFunctions.forEach(fn => fn(count))
  }

  return <div>
    state : {state}
    <button onClick={inc}>+1</button>
  </div>
}

const Counter2 = () => {
  const [state, setState] = useState(count)
  useEffect(() => {
    setStateFunctions.add(setState)
    return () => {
      setStateFunctions.delete(setState)
    }
  }, [])

  const inc = () => {
    count += 2
    setStateFunctions.forEach(fn => fn(count))
  }

  return <div>
    state2 : {state}
    <button onClick={inc}>+2</button>
  </div>
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
