import { createStore, combineReducers } from 'redux'
import { produce } from 'immer'
import { reducer, initState } from './reducer'

type MappedReducer<T extends { [k: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>
}
export type RootState = MappedReducer<typeof rootReducer>

const rootReducer = {
  desc: produce(reducer, initState)
}

export const store = createStore(combineReducers<RootState>(rootReducer))

