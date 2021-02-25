import { createStore, combineReducers } from 'redux'
import reducer, { initState } from './reducer'
import { produce } from 'immer'

type MappedReducer<T extends { [k: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>
}

const editorConfigReducer = produce(reducer, initState)

export { editorConfigReducer }