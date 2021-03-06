export enum Types {
  Font_Size,
  Theme,
  Indent,
  Save_Code
}

export type FontSizes = number

interface ActFontSize { type: Types.Font_Size, data: FontSizes }
interface ActTheme { type: Types.Theme, data: "dark" | "light" }
interface ActIndent { type: Types.Indent, data: 2 | 4 }
interface ActSaveCode { type: Types.Save_Code, data: string }

export const actFontSize = (size: FontSizes): ActFontSize => ({
  type: Types.Font_Size,
  data: size
})
export const actTheme = (theme: "dark" | "light"): ActTheme => ({
  type: Types.Theme,
  data: theme
})
export const actIndent = (indent: 2 | 4): ActIndent => ({
  type: Types.Indent,
  data: indent
})
export const actSaveCode = (code: string): ActSaveCode => ({
  type: Types.Save_Code,
  data: code
})

export type Actions = ActFontSize | ActTheme | ActIndent | ActSaveCode