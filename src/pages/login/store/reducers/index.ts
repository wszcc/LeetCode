import {combineReducers} from 'redux'
import phoneInput, { IState as IPhoneInputState } from './phoneInput'
import captchaInput, { IState as ICaptchaInputState }  from './captchaInput'
import pwdLoginForm, { IState as IPwdLoginFormState } from './pwdLoginForm'
import loginMain, {IState as ILoginFormState} from './loginMain'

export interface IRootState {
    phoneInput: IPhoneInputState;
    captchaInput: ICaptchaInputState;
    pwdLoginForm: IPwdLoginFormState;
    loginMain: ILoginFormState;
}

const rootReducer = {
    loginMain,
    phoneInput,
    captchaInput,
    pwdLoginForm
}

export default combineReducers<IRootState>(rootReducer)

