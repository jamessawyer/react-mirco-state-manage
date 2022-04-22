import { createContext, useState, Dispatch, useContext, useReducer } from 'react'

type Action = { type: 'INC1' } | { type: 'INC2' }
const Count1Context = createContext<number>(0)
const Count2Context = createContext<number>(0)

const DispatchContext = createContext<Dispatch<Action>>(
  () => {}
)

const Counter1 = () => {
  const count1 = useContext(Count1Context)
  const dispatch = useContext(DispatchContext)

  return (
    <div>
      Count1: { count1 }
      <button onClick={() => dispatch({type: 'INC1'})}>+1</button>
    </div>
  )
}

const Counter2 = () => {
  const count2 = useContext(Count2Context)
  const dispatch = useContext(DispatchContext)

  return (
    <div>
      Count2: { count2 }
      <button onClick={() => dispatch({type: 'INC2'})}>+1</button>
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

const reducer = ((prev: { count1: number; count2: number }, action: Action) => {
  switch (action.type) {
    case 'INC1':
      return { ...prev, count1: prev.count1 + 1 }
    case 'INC2':
      return { ...prev, count2: prev.count2 + 1 }
    default:
      return prev
  }
})

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { count1: 0, count2: 0 })

  // 嵌套的 providers 提供reducer中部分state
  // 最外层提供一个 dispatch
  return (
    <DispatchContext.Provider value={dispatch}>
      <Count1Context.Provider value={state.count1}>
        <Count2Context.Provider value={state.count2}>
          {children}
        </Count2Context.Provider>
      </Count1Context.Provider>
    </DispatchContext.Provider>
  )
}



function App() {

  return (
    <Provider>
      <Parent />
    </Provider>
  )
}

export default App
