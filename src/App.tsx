import './App.css'
import CounterWithProvider from './CounterWithProvider'
import CounterWithReactTracked from './CounterWithReactTracked'
import CounterTrackedWithReducer from './CounterTrackedWithReducer'
import CounterTrackedWithRedux from './CounterTrackedWithRedux'

function App() {

  return (
    <div className="App">
      <h1>1️⃣ 常见useContext使用</h1>
      <CounterWithProvider />
      <hr />
      <h1>2️⃣ 使用 react-tracked + useState</h1>
      <CounterWithReactTracked />
      <hr />
      <h1>3️⃣ react-tracked + useReducer</h1>
      <CounterTrackedWithReducer />
      <hr />
      <h1>4️⃣ react-tracked + redux + react-redux</h1>
      <CounterTrackedWithRedux />
    </div>
  )
}

export default App
