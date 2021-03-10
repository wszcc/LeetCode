import {combineReducers} from 'redux'
import loginMain, {IState as ILoginFormState} from './loginMain'
import emailRegisterForm, {IState as IEmailRegisterFormState} from './emailRegisterForm'
import pwdLoginForm, {IState as IPwdLoginFormState} from './pwdLoginForm'

export interface IRootState {
    loginMain: ILoginFormState;
    pwdLoginForm: IPwdLoginFormState;
    emailRegisterForm: IEmailRegisterFormState;
}

const rootReducer = {
    loginMain,
    pwdLoginForm,
    emailRegisterForm
}

export default combineReducers<IRootState>(rootReducer)

