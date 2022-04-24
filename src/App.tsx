import { createContext, ReactNode, useRef, useContext, useMemo } from 'react'
import { useSubscription } from 'use-subscription';

type Store<T> = {
  getState: () => T;
  setState: (action: T | ((prev: T) => T)) => void;
  subscribe: (callback: () => void) => () => void
}

const createStore = <T extends unknown>(initialState: T): Store<T> => {
  let state = initialState
  let callbacks = new Set<() => void>()
  const getState = () => state

  const setState = (nextState: T | ((prev: T) => T)) => {
    state = typeof nextState === 'function'
      ? (nextState as (prev: T) => T)(state)
      : nextState

    callbacks.forEach(cb => cb())
  }

  const subscribe = (callback: () => void) => {
    callbacks.add(callback)
    return () => {
      callbacks.delete(callback)
    }
  }

  return { getState, setState, subscribe }
}

type State = { count: number, text?: string }


// 之前使用 createStore创建 module state
// 这里则将其作为 createContext 的 value
const StoreContext = createContext<Store<State>>(
  createStore<State>({ count: 0, text: 'hello'})
)

// 给了给不同组件提供不同的state, 创建一个 Provider
const StoreProvider = ({
  initialState,
  children
}: {
  initialState: State,
  children: ReactNode
}) => {
  const storeRef = useRef<Store<State>>()

  // 确保 store 对象只被初始化一次
  if (!storeRef.current) {
    storeRef.current = createStore(initialState)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

// “We can isolate state in a subtree thanks to Context, and we can avoid extra re-renders thanks to Subscription.”
// 结合使用 useContext & useSubscription 让我们可以获得context + subscription 两者的好处
// 既可以利用context对不同的组件提供不同的value 也可以利用subscription不产生额外的重渲染
const useSelector = <S extends unknown>(
  selector: (state: State) => S
) => {
  // 从 context 中获取 store, 而不是和之前一样通过传入store作为参数的形式
  const store = useContext(StoreContext)

  return useSubscription(
    useMemo(() => ({
      getCurrentValue: () => selector(store.getState()),
      subscribe: store.subscribe
    }), [store, selector])
  )
}

// 用于更新context中的state
const useSetState = () => {
  const store = useContext(StoreContext)
  return store.setState
}

// 将selector写在组件外，可以避免在组件中去使用 useCallback 去优化 增加额外的工作
const selectCount = (state: State) => state.count

const Component = () => {
  const count = useSelector(selectCount)
  const setState = useSetState()

  const inc = () => {
    setState((prev) => ({
      ...prev,
      count: prev.count + 1
    }))
  }

  return (
    <div>
      count: {count}
      <button onClick={inc}>+1</button>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1>使用默认的store</h1>
      <Component />
      <Component />
      <StoreProvider initialState={{ count: 10 }}>
        <h1>使用 store provider 提供不同的count</h1>
        <Component />
        <Component />

        <StoreProvider initialState={{ count: 20 }}>
          <h1>嵌套的 provider</h1>
          <Component />
          <Component />
        </StoreProvider>
      </StoreProvider>
    </div>
  )
}

export default App
