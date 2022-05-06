import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";

const textState = atom({
  key: 'textState',
  default: '',
})

const TextInput = () => {
  // useRecoilState 和 useState 类似 返回一个数组
  const [text, setText] = useRecoilState(textState)

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <br />
      Echo: {text}
    </div>
  )
}

// 派生 state
const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => get(textState).length
})

// textState发生变化时，派生状态charCountState也会更新，导致 CharCount 组件将重渲染
const CharCount = () => {
  const count = useRecoilValue(charCountState)
  return <>
    Char Count: {count}
  </>
}

const CharCounter = () => (
  <div>
    <TextInput />
    <CharCount />
  </div>
)

const CounterRecoil = () => (
  <RecoilRoot>
    <CharCounter />
  </RecoilRoot>
)

export default CounterRecoil
