import './App.css'
import CounterJotai from './CounterJotai'
import CounterMobx from './CounterMobx'
import CounterRecoil from './CounterRecoil'
import CounterRedux from './CounterRedux'
import CounterValtio from './CounterValtio'
import CounterZustand from './CounterZustand'

function App() {
  // 相同水果表示对比组
  // 🍉 🍍 🥝
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
      <h1>5️⃣ 🥝 Mobx</h1>
      <CounterMobx />
      <hr />
      <h1>6️⃣ 🥝 Valtio</h1>
      <CounterValtio />
    </div>
  )
}

export default App
