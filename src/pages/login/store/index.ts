import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import rootSaga from './sagas/rootSaga';


const sagaMiddleware = createSagaMiddleware();
 
const store = createStore(
  reducers, applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);
 
export default store
