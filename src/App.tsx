import { useState } from 'react'
import './App.css'
import CounterRedux from './CounterRedux'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>1️⃣ @redux/toolkits + react-redux</h1>
      <CounterRedux />
      <hr />
    </div>
  )
}

export default App
