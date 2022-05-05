import { useEffect, useState } from 'react'
import { createContainer } from 'react-tracked';

const useValue = () => useState({ text: 'hello', count: 0 })

// 使用 react-tracked 提供的 createContainer
const { Provider, useTracked } = createContainer(useValue)

const Counter = () => {
  // 这里使用 useTracked()
  const [state, setState] = useTracked()

  useEffect(() => {
    console.log('Tracked Counter Render')
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
  // 这里使用 useTracked()
  const [state, setState] = useTracked()

  useEffect(() => {
    console.log('Tracked TextBox Render')
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
