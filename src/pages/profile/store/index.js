import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import proReducer from './reducers/profile_reqHistory'
import rootSaga from './sagas/sagaRoot'

const sagaMiddleware = createSagaMiddleware()

export default createStore(proReducer, applyMiddleware(sagaMiddleware))


sagaMiddleware.run(rootSaga)