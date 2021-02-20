import { createAction, createTypes, mapActions } from "../../../../../../../../utils/shared";

enum basicTypes {
  FetchData,
  GotData,
}
export const Types = createTypes(basicTypes)
export const actions = {
  fetchData() {
    return createAction(Types.FetchData, null)
  },
  putData() {
    return createAction(Types.GotData, [
      {
        author: "fy",
        content: "hello world"
      }
    ])
  }
}
export type Actions = mapActions<typeof actions>