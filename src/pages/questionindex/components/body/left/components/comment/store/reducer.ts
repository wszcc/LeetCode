import produce from "immer"
import { Actions, Types } from "./actions"
export interface State {
  comment: {
    flag: number,
    comments: { author: string, content: string }[]
  }
}
const baseState: State = {
  comment: {
    flag: 0,
    comments: []
  }
}

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Types.FetchData:
      state.comment.flag = 0
      break;
    case Types.GotData:
      state.comment.flag = 1
      state.comment.comments = action.data
  }
}
export default produce(reducer, baseState)