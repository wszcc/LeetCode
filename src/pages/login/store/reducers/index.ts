import {combineReducers} from 'redux'
import phoneInput, { IState as IPhoneInputState } from './phoneInput'
import captchaInput, { IState as ICaptchaInputState }  from './captchaInput'
import pwdLoginForm, { IState as IPwdLoginFormState } from './pwdLoginForm'

export interface IRootState {
    phoneInput: IPhoneInputState;
    captchaInput: ICaptchaInputState;
    pwdLoginForm: IPwdLoginFormState;
}

const rootReducer = {
    phoneInput,
    captchaInput,
    pwdLoginForm
}

export default combineReducers<IRootState>(rootReducer)

