import React, { createContext, useContext, useEffect, useState } from "react";

// 自定义 hook
const useValue = () => useState({ count: 0, text: 'hello' })

// context
const StateContext = createContext<ReturnType<typeof useValue> | null>(null)

const Provider = ({ children }: {children: React.ReactNode}) => (
  <StateContext.Provider value={useValue()}>
    {children}
  </StateContext.Provider>
)

const useStateContext = () => {
  const contextValue = useContext(StateContext)

  if (contextValue === null) {
    throw new Error('useState must be used within a Provider')
  }

  return contextValue
}

const Counter = () => {
  const [state, setState] = useStateContext()

  useEffect(() => {
    console.log('Counter Render')
  })

  const inc = () => {
    setState(prev => ({
      ...prev,
      count: prev.count + 1
    }))
  }

  return (
    <div>
      count: {state.count}
      <button onClick={inc}>+1</button>
    </div>
  )
}

const TextBox = () => {
  const [state, setState] = useStateContext()

  useEffect(() => {
    console.log('TextBox Render')
  })

  const setText = (text: string) => {
    setState(prev => ({ ...prev, text }))
  }

  return (
    <div>
      <input
        type="text"
        value={state.text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}

/**
 * 使用 useContext 的缺点就是
 * Provider中的任何value 变化都会导致使用了context的组件重新渲染
 */
export default () => (
  <Provider>
    <div>
      <Counter />
      <Counter />
      <TextBox />
      <TextBox />
    </div>
  </Provider>
)