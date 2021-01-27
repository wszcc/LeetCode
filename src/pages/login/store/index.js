import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './action/reducer'
import rootSaga from './saga/rootSaga'
 
const sagaMiddleware = createSagaMiddleware()
 
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
 
sagaMiddleware.run(rootSaga)
 
export default store
