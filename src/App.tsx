import './App.css'
import CounterJotai from './CounterJotai'
import CounterMobx from './CounterMobx'
import CounterRecoil from './CounterRecoil'
import CounterRedux from './CounterRedux'
import CounterZustand from './CounterZustand'

function App() {

  return (
    <div className="App">
      <h1>1️⃣ 🍉 @redux/toolkits + react-redux</h1>
      <CounterRedux />
      <hr />
      <h1>2️⃣ 🍉 zustand</h1>
      <CounterZustand />
      <hr />
      <h1>3️⃣ 🍍 Recoil</h1>
      <CounterRecoil />
      <hr />
      <h1>4️⃣ 🍍 Jotai</h1>
      <CounterJotai />
      <hr />
      <h1>5️⃣ Mobx</h1>
      <CounterMobx />
    </div>
  )
}

export default App
