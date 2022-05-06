import create from 'zustand'

type State = {
  counter: {
    value: number
  },
  counterActions: {
    increment: () => void,
    decrement: () => void,
    incrementByAmount: (amount: number) => void
  }
}

// 同时在store中定义 state & actions
const useStore = create<State>((set) => ({
  counter: { value: 0 },
  counterActions: {
    increment: () => set(state => ({
      counter: { value: state.counter.value + 1 }
    })),
    decrement: () => set(state => ({
      counter: { value: state.counter.value - 1 }
    })),
    incrementByAmount:  (amount: number) => set(state => ({
      counter: { value: state.counter.value + amount }
    })),
  }
}))

function Counter() {
  const count = useStore(state => state.counter.value)
  const { increment, decrement, incrementByAmount } = useStore(state => state.counterActions)

  return (
    <div>
      <button onClick={() => increment()}>+1</button>
      <span>{count}</span>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={() => incrementByAmount(5)}>+5</button>
    </div>
  )
}

const CounterZustand = () => (
  <div>
    <Counter />
    <Counter />
  </div>
)

export default CounterZustand
