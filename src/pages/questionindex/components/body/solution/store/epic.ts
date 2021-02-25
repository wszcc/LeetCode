import { Epic, ofType } from "redux-observable";
import { filter, map, mergeMap } from "rxjs/operators";
import { getSolution, Types } from "./index";
import { fetchSolution } from '../../../../../../apis/solution'
import { ErrorCode } from "../../../../../../apis";
import { Actions, ActFetchingSolution, ActSorting, sortSolution } from "../store";
import { RootState } from "../../../../store";

export const solutionEpic: Epic<Actions> = (actions$) => actions$.pipe(
  ofType(Types.FetchSolution),
  mergeMap((action) => {
    const { questionId, currentPage } = (action as ActFetchingSolution).payload
    return fetchSolution(questionId, currentPage)
  }),
  filter(res => res.code === ErrorCode.Success),
  map(res => getSolution(res.data))
)
export const sortSolutionEpic: Epic<Actions, any, RootState> = (actions$, state$) => actions$.pipe(
  ofType(Types.Sorting),
  map(action => {
    const type = (action as ActSorting).payload
    const list = state$.value.solution.solutionList.slice()
    let solution: typeof list
    switch (type) {
      case "popular":
        solution = list.sort((next, prev) => next.thumbup - prev.thumbup)
        break
      default:
        solution = list
    }
    return sortSolution(solution)
  })
)