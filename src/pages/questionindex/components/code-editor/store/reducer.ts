import { Int, storage } from '../../../../../utils/shared';
import { Actions, Types } from './actions'

interface EditorConfig {
  theme: "dark" | "light",
  indent: 2 | 4,
  fontSize: number
}

export const initState: EditorConfig = { /**如果本地有保存用本地的 */
  fontSize: Int(storage.get("editor-font-size") as string) || 16,
  theme: storage.get("editor-theme") as "light" | "dark" || "light",
  indent: Int(storage.get("editor-indent") as string) as 2 | 4 || 2,
}

const reducer = (state: Partial<EditorConfig>, action: Actions) => {
  switch (action.type) {
    case Types.Font_Size:
      storage.set("editor-font-size", action.data)
      state.fontSize = action.data;
      break;
    case Types.Theme:
      storage.set("editor-theme", action.data)
      state.theme = action.data
      break;
    case Types.Indent:
      storage.set("editor-indent", action.data)
      state.indent = action.data
      break;
  }
}
export default reducer