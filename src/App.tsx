import { useState } from 'react'

import useStore, { StoreType } from './useStore'

const count1Selector = (state: StoreType) => state.count1

const Counter1 = () => {
  const count1 = useStore(count1Selector)

  const increment = () => {
    useStore.setState(prev => ({ count1: prev.count1 + 1 }))
  }
  return <div>
    counter1: {count1}
    <button onClick={increment}>+1</button>
    </div>
}

const count2Selector = (state: StoreType) => state.count2
// selector的方式 选取更新函数
const selectInc2 = (state: StoreType) => state.inc2

const Counter2 = () => {
  const count2 = useStore(count2Selector)
  const inc2 = useStore(selectInc2)

  return <div>
    counter2: {count2}
    <button onClick={inc2}>+1</button>
  </div>
}

// 使用 selector 创建 派生状态
const totalSelector = (state: StoreType) => state.count1 + state.count2
const Total = () => {
  const total = useStore(totalSelector)
  return <div>派生状态total: {total}</div>
}


function App() {

  return (
    <div className="App">
      <Counter1 />
      <Counter2 />
      <Total />
    </div>
  )
}

export default App
