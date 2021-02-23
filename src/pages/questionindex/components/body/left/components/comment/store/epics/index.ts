import { combineEpics, ActionsObservable, ofType } from "redux-observable";
import { delay, mapTo } from "rxjs/operators";
import { actions, Types, Actions } from "../actions";

const { putData } = actions

const testEpic = (action$: ActionsObservable<Actions>) => action$.pipe(
  ofType(Types.FetchData),
  delay(1000),
  mapTo(putData())
)

export const rootEpic = combineEpics(testEpic)