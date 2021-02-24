import produce from "immer"
import { SolutionList, SortType } from "../../../../../../apis/solution"

export enum Types {
  GetSolutionList = "GetSolutionLists",
  FetchSolution = "FetchSolution",
  Sorting = "Sorting",
  Sort = "Sort",
  ShowDetail = "ShowDetail",
  GetDetail = "GetDetail",
  PutDetail = "PutDetail",
  SwitchId = "SwitchId"
}

export interface ActFetchingSolution {
  type: Types.FetchSolution,
  payload: {
    questionId: number,
    currentPage: number
  }
}
export interface ActGetSolutionList {
  type: Types.GetSolutionList,
  payload: SolutionList[]
}
export interface ActSorting {
  type: Types.Sorting,
  payload: SortType
}
export interface ActSort {
  type: Types.Sort,
  payload: SolutionList[]
}
export interface ActShowDetail {
  type: Types.ShowDetail,
  payload: boolean
}
export interface ActSwitchAnswerId {
  type: Types.SwitchId,
  payload: number
}
export const fetchingSolution = (questionId: number, currentPage = 0): ActFetchingSolution => ({
  type: Types.FetchSolution,
  payload: {
    questionId,
    currentPage
  }
})
export const getSolution = (list: SolutionList[]): ActGetSolutionList => ({
  type: Types.GetSolutionList,
  payload: list
})
export const sorting = (type: SortType): ActSorting => ({
  type: Types.Sorting,
  payload: type
})
export const dispatchShowDetail = (show: boolean): ActShowDetail => ({
  type: Types.ShowDetail,
  payload: show
})
export const switchId = (id: number): ActSwitchAnswerId => ({
  type: Types.SwitchId,
  payload: id
})

export const sortSolution = (list: SolutionList[]): ActSort => ({
  type: Types.Sort,
  payload: list
})
export type Actions =
  | ActGetSolutionList | ActSort | ActFetchingSolution
  | ActSorting | ActShowDetail | ActSwitchAnswerId

export interface State {
  sortType: SortType,
  currentPage: number,
  solutionList: SolutionList[],
  showDetail: boolean,
  answerId: number
}

export const reducer = produce((state: State, action: Actions) => {
  switch (action.type) {
    case Types.GetSolutionList:
      state.solutionList = action.payload
      break
    case Types.Sorting:
      state.sortType = action.payload
      break
    case Types.Sort:
      state.solutionList = action.payload
      break
    case Types.ShowDetail:
      state.showDetail = action.payload
      break
    case Types.SwitchId:
      state.answerId = action.payload
  }
}, {
  sortType: "earliest",
  currentPage: 1,
  solutionList: [],
  showDetail: false,
  answerId: 0
} as State)