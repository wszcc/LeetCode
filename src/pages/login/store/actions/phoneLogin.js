import { TO_PWD_LOGIN, PHONE_LOGIN, PHONE_REGISTER } from '../constant'

export const toPwdLogin = data => ({type: TO_PWD_LOGIN, data})
export const phoneLogin = data => ({type: PHONE_LOGIN, data})
export const phoneRegister = data => ({type: PHONE_REGISTER, data})