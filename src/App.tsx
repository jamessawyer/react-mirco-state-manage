import { useState } from 'react'
import './App.css'
import CounterRecoil from './CounterRecoil'
import CounterRedux from './CounterRedux'
import CounterZustand from './CounterZustand'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>1️⃣ @redux/toolkits + react-redux</h1>
      <CounterRedux />
      <hr />
      <h1>2️⃣ zustand</h1>
      <CounterZustand />
      <hr />
      <h1>3️⃣ Recoil</h1>
      <CounterRecoil />
    </div>
  )
}

export default App
