import {combineReducers} from 'redux'
import loginHeader from './loginHeader'
import phoneLogin from './phoneLogin'
import pwdLogin from './pwdLogin'

export default combineReducers({
    loginHeader,
    phoneLogin,
    pwdLogin,
})