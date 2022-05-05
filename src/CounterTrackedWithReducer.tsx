import { useEffect, useReducer } from "react"
import { createContainer } from "react-tracked"

// 使用 useReducer
const useValue = () => {
  type State = { text: string, count: number }

  type Action = 
    | { type: 'INC' }
    | { type: 'SET_TEXT', text: string }

  const [state, dispatch] = useReducer((state: State, action: Action)=> {
    if (action.type === 'INC') {
      return { ...state, count: state.count + 1 }
    }

    if (action.type === 'SET_TEXT') {
      return { ...state, text: action.text}
    }

    throw new Error('unknown action type')
  }, { count: 0, text: 'hello' })

  useEffect(() => {
    console.log('latest state: ' + JSON.stringify(state, null, 2))
  }, [state])

  // as const 表示返回类型为 元组（tuple） 而不是数组类型
  return [state, dispatch] as const
}

// 使用 react-tracked 提供的 createContainer
// 这和 useState 一样
const { Provider, useTracked } = createContainer(useValue)

const Counter = () => {
  // 这里使用 useTracked()
  const [state, dispatch] = useTracked()

  useEffect(() => {
    console.log('Tracked Counter Render useReducer')
  })

  const inc = () => dispatch({ type: 'INC' })

  return (
    <div>
      count: {state.count}
      <button onClick={inc}>+1</button>
    </div>
  )
}

const TextBox = () => {
  // 这里使用 useTracked()
  const [state, dispatch] = useTracked()

  useEffect(() => {
    console.log('Tracked TextBox Render useReducer')
  })

  const setText = (text: string) => dispatch({ type: 'SET_TEXT', text })

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
 * 使用 react-tracked
 * 部分状态更新，只有使用该状态的组件才发生更新，避免重渲染
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
