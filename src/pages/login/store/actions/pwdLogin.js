import {TO_PHONE_LOGIN, PWD_LOGIN, RESET_PWD} from '../constant'

export const toPhoneLogin = data => ({type: TO_PHONE_LOGIN, data})
export const pwdLogin = data => ({type: PWD_LOGIN, data})
export const resetPwd = data => ({type: RESET_PWD, data})