import { applyMiddleware, createStore, Reducer } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import reducer from "./reducer";

const middleware = createEpicMiddleware()

const store = createStore(reducer as Reducer, applyMiddleware(middleware))

middleware.run(rootEpic as any)

export { store }