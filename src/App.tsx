import './App.css'
import CounterJotai from './CounterJotai'
import CounterRecoil from './CounterRecoil'
import CounterRedux from './CounterRedux'
import CounterZustand from './CounterZustand'

function App() {

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
      <hr />
      <h1>4️⃣ Jotai</h1>
      <CounterJotai />
    </div>
  )
}

export default App
