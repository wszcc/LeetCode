import {
    BE_INVALID,
    NOT_BE_INVALID,
    BE_EMPTY_USERNAME,
    NOT_BE_EMPTY_USERNAME,
    ON_USERNAME_CHANGE,
    ON_PWD_CHANGE,
    BE_EMPTY_PWD,
    NOT_BE_EMPTY_PWD,
    KEEP_PWD_DEFAULT,
    KEEP_USERNAME_DEFAULT,
    BREAK_PWD_DEFAULT,
    BREAK_USERNAME_DEFAULT
} from '../constant'


export const beInvalid = data => ({type: BE_INVALID, data})
export const notBeInvalid = data => ({type: NOT_BE_INVALID, data})

export const beEmptyUername = data => ({type: BE_EMPTY_USERNAME, data})
export const notBeEmptyUsername = data => ({type: NOT_BE_EMPTY_USERNAME, data})

export const beEmptyPwd = data => ({type: BE_EMPTY_PWD, data})
export const notBeEmptyPwd = data => ({type: NOT_BE_EMPTY_PWD, data})

export const onUsernameChange = data => ({type: ON_USERNAME_CHANGE, data})
export const onPwdChange = data => ({type: ON_PWD_CHANGE, data})

export const keepUsernameDefault = data => ({type: KEEP_USERNAME_DEFAULT, data})
export const breakUsernameDefault = data => ({type:  BREAK_USERNAME_DEFAULT, data})

export const keepPwdDefault = data => ({type: KEEP_PWD_DEFAULT, data})
export const breakPwdDefault = data => ({type:  BREAK_PWD_DEFAULT, data})


