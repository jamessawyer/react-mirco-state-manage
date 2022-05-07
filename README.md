本仓库示例全部来自 📚 [Micro State Management with React Hooks - Dashi Kato@github](https://github.com/PacktPublishing/Micro-State-Management-with-React-Hooks) 这本书。
原仓库更好阅读，我这里通过分支的形式展示了各个章节中的示例
 1. 01-reducer-and-context： 使用 Reducer + Context的示例
 2. 02-custom-hooks： 自定义Hooks的写法
 3. 03-custom-hooks-factory-pattern： 自定义hooks + 工厂模式的写法
 4. 04-module-state： 介绍存放状态位置之一： Module state 自定义Store： `{getState, subscribe, setState}` （第4章）
 5. 05-module-state-using-subscription： 模块状态 + 订阅 的方式更新状态 （第4章）
 6. 06-use-store-with-selector： 为了解决重渲染的问题，引入 `selector` 只选取部分状态的写法 （第4章）
 7. 07-use-subscription-with-store： 使用第3方库 `use-subscription` 解决上面的6中的问题 （第4章）
 8. 08-context-with-subscription：Context + Provider + useSubscription的方式，自定义 StoreProvider （第5章）
 9. 09-zustand：使用 zustand 模块状态管理，Counter + Todo App 示例，类比Redux （第7章）
 10. 10-jotai： 使用 Jotai 组件状态管理，引入 Atom + Atom Config等概念，通过Provider传入atom config,实现状态的复用 （第8章）
 11. 11-valtio：可变状态更新，Counter示例 + Todo App的多种写法，对比 MobX （第9章）
 12. 12-react-tracked： 这个不是状态管理，而是结合React自带的 `useState | useReducer` 以及第3方库，比如 `redux` 对重渲染问题进行优化的方式 （第10章）
 13. 13-all-state-managers：多组对比，并给出差异，以及挑选状态管理时的原则（第11章）
     1.  redux @redux/toolkit vs Zustand
     2.  Recoid vs Jotai
     3.  Mobx vs Valtio


状态管理主要考虑的2个问题：
1. 状态存放位置：`module state` vs `component state`
2. 状态更新方式：`immutable update` vs `mutable update`

React性能优化，避免额外的重渲染（re-renders）：
1. 手动优化，使用 `selector` 的方式，比如 redux, zustand
2. 使用自动方式，**订阅** 或者是 `proxy` 的形式，比如valtio，jotai，react-tracked

