import { createStore, combineReducers, applyMiddleware } from 'redux'
import { produce } from 'immer'
import { reducer, initState } from './reducer'
import { editorConfigReducer } from '../components/code-editor/store'
import { reducer as SolutionStore } from '../components/body/solution/store'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { solutionEpic, sortSolutionEpic } from '../components/body/solution/store/epic'

type MappedReducer<T extends { [k: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>
}
export type RootState = MappedReducer<typeof rootReducer>

const rootReducer = {
  desc: produce(reducer, initState),
  editorConfig: editorConfigReducer,
  solution: SolutionStore
}

const epicMiddleware = createEpicMiddleware()
const rootEpic = combineEpics(solutionEpic, sortSolutionEpic)

export const store = createStore(combineReducers<RootState>(rootReducer), applyMiddleware(epicMiddleware))

epicMiddleware.run(rootEpic)

