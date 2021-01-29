import { Actions, Types } from './actions'

interface EditorConfig {
  theme: "dark" | "light",
  indent: 2 | 4,
  fontSize: number
}

export const initState: EditorConfig = {
  theme: "light",
  indent: 2,
  fontSize: 16
}

const reducer = (state: Partial<EditorConfig>, action: Actions) => {
  switch (action.type) {
    case Types.Font_Size:
      state.fontSize = action.data;
      break;
    case Types.Theme:
      state.theme = action.data
      break;
    case Types.Indent:
      state.indent = action.data
      break;
  }
}
export default reducer