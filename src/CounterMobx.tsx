import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

class Timer {
  secondsPassed = 0

  constructor() {
    // 使 Timer 实例 变为 observable
    makeAutoObservable(this)
  }

  increase() {
    this.secondsPassed += 1
  }

  reset() {
    this.secondsPassed = 0
  }
}

const myTimer = new Timer()

setInterval(() => {
  myTimer.increase()
}, 1000)

// observer 是一个 HoC
const TimerView = observer(({timer}: {timer: Timer}) => (
  <button onClick={() => timer.reset()}>
    Seconds Passed: {timer.secondsPassed}
  </button>
))

const CounterMobx = () =>(
  <div>
    <TimerView timer={myTimer} />
  </div>
)

export default CounterMobx
