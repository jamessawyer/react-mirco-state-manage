import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type CountContextType = [
  number,
  Dispatch<SetStateAction<number>>
]

const Count1Context = createContext<CountContextType | null>(null)

const Count1Provider = ({ children }: { children: React.ReactNode }) => (
  // 注意这里使用了 value={useState(0)} 
  // 等价于 const [count, setCount] = useState(0) 
  // <Count1Context.Provider value={[count, setCount]}></Count1Context.Provider>
  <Count1Context.Provider value={useState(0)}>
    {children}
  </Count1Context.Provider>
)

// 自定义Hooks
const useCount1 = () => {
  const value = useContext(Count1Context)

  if (value === null) throw new Error('Provider missing')
  return value
}

const Count2Context = createContext<CountContextType | null>(null)

const Count2Provider = ({ children }: { children: React.ReactNode }) => (
  // 注意这里使用了 value={useState(0)} 
  // 等价于 const [count, setCount] = useState(0) 
  // <Count1Context.Provider value={[count, setCount]}></Count1Context.Provider>
  <Count2Context.Provider value={useState(0)}>
    {children}
  </Count2Context.Provider>
)

// 自定义Hooks
const useCount2 = () => {
  const value = useContext(Count2Context)

  if (value === null) throw new Error('Provider missing')
  return value
}

const Counter1 = () => {
  // 使用封装的Hooks 隐藏context细节
  const [count1, setCount1] = useCount1()

  return (
    <div>
      Count1: {count1}
      <button onClick={() => setCount1(c => c + 1)}>+1</button>
    </div>
  )
}

const Counter2 = () => {
  // 使用封装的Hooks 隐藏context细节
  const [count2, setCount2] = useCount2()

  return (
    <div>
      Count1: {count2}
      <button onClick={() => setCount2(c => c + 1)}>+1</button>
    </div>
  )
}

const Parent = () => (
  <>
    <Counter1 />
    <Counter1 />
    <Counter2 />
    <Counter2 />
  </>
)

function App() {

  return (
    <Count1Provider>
      <Count2Provider>
        <Parent />
      </Count2Provider>
    </Count1Provider>
  )
}

export default App
