import {combineReducers} from 'redux'
import loginMain, {IState as ILoginFormState} from './loginMain'

export interface IRootState {
    loginMain: ILoginFormState;
}

const rootReducer = {
    loginMain
}

export default combineReducers<IRootState>(rootReducer)

