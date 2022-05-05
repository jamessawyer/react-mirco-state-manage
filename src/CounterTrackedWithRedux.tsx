import { createTrackedSelector } from "react-tracked"
import { legacy_createStore as createStore } from "redux"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

type State = { count: number, text: string }
type Action = 
  | { type: 'INC' }
  | { type: 'SET_TEXT', text: string }

const initialState = { count: 0, text: 'hello' }

const reducer = (state = initialState, action: Action) => {
  if (action.type === 'INC') {
    return { ...state, count: state.count + 1 }
  }
  if (action.type === 'SET_TEXT') {
    return { ...state, text: action.text }
  }

  return state
}

const store = createStore(reducer)

const useTrackedState = createTrackedSelector<State>(useSelector)

const Counter = () => {
  const dispatch = useDispatch()

  const { count } = useTrackedState()

  useEffect(() => {
    console.log('Tracked Counter Render Redux')
  })

  const inc = () => dispatch({ type: 'INC' })

  return (
    <div>
      count: {count}
      <button onClick={inc}>+1</button>
    </div>
  )
}

const TextBox = ({ showCount }: { showCount: boolean }) => {
  const dispatch = useDispatch()

  const state = useTrackedState()

  useEffect(() => {
    console.log('Tracked TextBox Render Redux')
  })

  const setText = (text: string) => {
    dispatch({ type: 'SET_TEXT', text })
  }

  return (
    <div>
      <input
        type="text"
        value={state.text}
        onChange={e => setText(e.target.value)}
      />
      { showCount && <span>{state.count}</span> }
    </div>
  )
}

export default () => (
  <Provider store={store}>
    <div>
      <Counter />
      <Counter />
      <TextBox showCount />
      <TextBox showCount={false} />
    </div>
  </Provider>
)