import {combineReducers} from 'redux'
import phoneInput from './phoneInput'
import captchaInput from './captchaInput'
import pwdLoginForm from './pwdLoginForm'

export default combineReducers(
    {
        // loginMain,
        phoneInput,
        captchaInput,
        pwdLoginForm
    }
)