import produce, { Immutable } from "immer"
import { useState } from "react"
import { LooseObj } from "../shared"

interface Update<T> {
  (updateFn: (draft: Immutable<T>) => void):void
}

export const useImmer = <T extends LooseObj>(initState: T):[T, Update<T>] => {
  const [state, setState] = useState<T>(initState)

  const update:Update<T> = (updateFn) => {
    const newState = produce<T>(state, updateFn)
    setState(newState)
  }
  return [state, update]
}