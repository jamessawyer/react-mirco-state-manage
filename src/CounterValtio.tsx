import { proxy, useSnapshot } from "valtio";

const myTimer = proxy({
  secondsPassed: 0,
  increase: () => {
    myTimer.secondsPassed += 1
  },
  reset: () => {
    myTimer.secondsPassed = 0
  }
})

// Vaitio 也可以写成如下形式：这样更有利于代码分割以及tree-shaking
// const myTimer = proxy({secondsPassed: 0})
// const increase = () => myTimer.secondsPassed += 1
// const reset = () => myTimer.secondsPassed = 0
// const useSecondsPassed = () => useSnapshot(myTimer).secondsPassed

setInterval(() => {
  myTimer.increase()
}, 1000)

const TimerView = ({timer}: {timer: typeof myTimer}) => {
  const snap = useSnapshot(timer)

  return (
    <button onClick={() => timer.reset()}>
      Seconds Passed: {snap.secondsPassed}
    </button>
  )
}

const CounterValtio = () =>(
  <div>
    <TimerView timer={myTimer} />
  </div>
)

export default CounterValtio
