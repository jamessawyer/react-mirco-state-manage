import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import CounterWithProvider from './CounterWithProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>1️⃣1️常见useContext使用</h1>
      <CounterWithProvider />
    </div>
  )
}

export default App
