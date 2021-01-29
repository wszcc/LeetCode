import { createStore, combineReducers } from 'redux'
import reducer, { initState } from './reducer'
import { produce } from 'immer'

type MappedReducer<T extends { [k: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>
}
export type RootState = MappedReducer<typeof rootReducer>

const rootReducer = {
  editorConfig: produce(reducer, initState)
}

const store = createStore(combineReducers<RootState>(rootReducer))

export { store }