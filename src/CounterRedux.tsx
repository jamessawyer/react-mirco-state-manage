import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

const initialState = {
  value: 0
}

const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

const { increment, decrement, incrementByAmount } = countSlice.actions
const counterReducer = countSlice.reducer

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

function Counter() {
  const count = useSelector((
    state: { counter: { value: number} }
  ) => state.counter.value)

  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}

const CounterRedux = () => (
  <Provider store={store}>
    <div>
      <Counter />
      <Counter />
    </div>
  </Provider>
)

export default CounterRedux
