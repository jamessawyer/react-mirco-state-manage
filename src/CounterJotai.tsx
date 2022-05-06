import { atom, useAtom, useAtomValue } from "jotai";

// Jotai 更为简洁 不需要 key
const textAtom = atom('')

const TextInput = () => {
  const [text, setText] = useAtom(textAtom)

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <br />
      Echo: {text}
    </div>
  )
}

// 派生 Atom
const charCountAtom = atom(get => get(textAtom).length)

const CharCount = () => {
  const count = useAtomValue(charCountAtom)
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

// 可以看出 不同于 Recoil的是，Jotai不需要 Provider
const CounterJotai = () => (
  <>
    <CharCounter />
  </>
)

export default CounterJotai