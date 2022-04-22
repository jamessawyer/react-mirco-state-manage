import { createContext, useState, useContext, createElement } from 'react'

// 工厂函数 返回一个 Provider & 自定义Hook 避免重复的业务逻辑
const createStateContext = <Value, State>(useValue: (init?: Value) => State) => {
  const StateContext = createContext<State | null>(null)
  const StateProvider = ({initialValue, children}: {initialValue?: Value, children?: React.ReactNode}) => (
    <StateContext.Provider value={useValue(initialValue)}>
      {children}
    </StateContext.Provider>
  )

  const useContextState = () => {
    const value = useContext(StateContext)
    if (value === null) {
      throw new Error('useContextState must be used within a StateProvider')
    }
    return value
  }

  return [StateProvider, useContextState] as const
}

const useNumberState = (init?: number) => useState(init || 0)

const [Counter1Provider, useCount1] = createStateContext(useNumberState)
const [Counter2Provider, useCount2] = createStateContext(useNumberState)

const Counter1 = () => {
  const [count, setCount] = useCount1()
  return (
    <div>
      count1: {count}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}
const Counter2 = () => {
  const [count, setCount] = useCount2()
  return (
    <div>
      count2: {count}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}

const Parent = () => (
  <div>
    <Counter1 />
    <Counter1 />
    <Counter2 />
    <Counter2 />
  </div>
)

function App() {

  // 可以给一个 initialValue
  return (
    <Counter1Provider initialValue={1}>
      <Counter2Provider>
        <Parent />
      </Counter2Provider>
    </Counter1Provider>
  )
}

function AnotherSolution() {
  const providers = [
    [Counter1Provider, {initialValue: 10}],
    [Counter2Provider, {initialValue: 20}]
  ] as const

  // 使用 reduceRight 构建一个 providers tree
  // 这种方法也可以用于其它组件的嵌套
  return providers.reduceRight((children, [Comp, props]) => createElement(Comp, props, children), <Parent />)
}

export default App
