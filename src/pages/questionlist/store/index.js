import {createStore,combineReducers} from 'redux';
import list from './reudcer/list';
const store = createStore(combineReducers({
    list
}));

export default store;