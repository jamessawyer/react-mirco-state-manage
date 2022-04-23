import { useCallback, useEffect, useState } from 'react'

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

const store = createStore({ count1: 1, count2: 2 })
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

// 因为上面的 useStore 返回整个 state 对象
// 这样会导致 state中的任何一部分状态发生了更新，其余订阅了store的组件 都会重新渲染 导致性能问题
// 所以我们需要把 state 中的某个部分抽离出来
const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
  const [state, setState] = useState(() => selector(store.getState()))

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()))
    })

    setState(selector(store.getState()))

    return unsubscribe
  }, [store, selector])

  return state
}



const Counter1 = () => {
  // 使用 useCallback 获取一个稳定的 selector 函数
  const state = useStoreSelector(store, useCallback(state => state.count1, []))

  const inc = () => {
    // 注意这里需要使用 immutable 的方式更新对象
    store.setState(prev => ({
      ...prev,
      count1: prev.count1 + 1
    }))
  }

  return <div>
    state : {state}
    <button onClick={inc}>+1</button>
  </div>
}

// selector 函数 只选取部分状态
const selectCount2 = (state: ReturnType<typeof store.getState>) => state.count2

const Counter2 = () => {
  const state = useStoreSelector(store, selectCount2)

  const inc = () => {
    store.setState(prev => ({
      ...prev,
      count2: prev.count2 + 1
    }))
  }

  return <div>
    state2 : {state}
    <button onClick={inc}>+1</button>
  </div>
}

function App() {

  // 使用 selector 之后，Counter1中的 count1 更新不会导致 Counter2组件重渲染
  return (
    <div className="App">
      <Counter1 />
      <Counter1 />
      <Counter2 />
      <Counter2 />
    </div>
  )
}

export default App
