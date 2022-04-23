import { useEffect, useState } from 'react'

const createContainer = (initialState: unknown) => {
  let state = initialState
  const getState = () => state
  const setState = (nextState: unknown) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState
  }

  return { getState, setState }
}

type Store<T> = {
  getState: () => T,
  setState: (action: T | ((prev: T) => T)) => void,
  subscribe: (callback: () => void) => () => void // 回调函数 返回一个函数取消订阅
}

const createStore = <T extends unknown>(initialState: T): Store<T> => {
  let state = initialState
  const callbacks = new Set<() => void>()

  const getState = () => state

  const setState = (nextState: T | ((prev: T) => T)) => {
    state = typeof nextState === 'function' 
              ? (nextState as (prev: T) => T)(state)
              : nextState
    callbacks.forEach(callback => callback())
  }

  const subscribe = (callback: () => void) => {
    callbacks.add(callback)
    return () => callbacks.delete(callback)
  }

  return { getState, setState, subscribe }
}

const store = createStore({ count: 0 })
// console.log('get state: ', store.getState())
// store.setState({ count: 1 })
// console.log('get state 2: ', store.getState())
// store.subscribe(() => console.log('subscript'))

const useStore = <T extends unknown>(store: Store<T>) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState())
    })

    // 调用一次 setState
    setState(store.getState())
    return unsubscribe
  }, [store])

  // 返回 state 和 更新 state 的方法
  // https://stackoverflow.com/a/66993654
  // as const 表示 const assertion (const断言)
  // const 断言告诉编译器推断出它可以为表达式推断出的最窄 或最具体的类型。
  // 如果将其关闭，编译器将使用其默认类型推断行为，这可能会导致更广泛或更通用的类型。
  return [state, store.setState] as const
}



const Counter1 = () => {
  const [state, setState] = useStore(store)

  const inc = () => {
    setState(prev => ({
      ...prev,
      count: prev.count + 1
    }))
  }

  return <div>
    state : {state.count}
    <button onClick={inc}>+1</button>
  </div>
}
const Counter2 = () => {
  const [state, setState] = useStore(store)

  const inc = () => {
    setState(prev => ({
      ...prev,
      count: prev.count + 2
    }))
  }

  return <div>
    state2 : {state.count}
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
