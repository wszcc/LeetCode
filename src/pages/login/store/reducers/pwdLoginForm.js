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

const initState = {
    isUsernameKeepDefault: true,
    isPwdKeepDefault: true,
    isInvalid: true,
    isUsernameEmpty: true,
    isPwdEmpty: true,
    username: '',
    password: ''
};

export default function pwdLoginForm(state = initState, action) {
    const {type, data} = action;
    switch (type) {
        case BE_INVALID: 
            return {...state, isInvalid: true};
        case NOT_BE_INVALID:
            return {...state, isInvalid: false};
        case KEEP_PWD_DEFAULT:
            return {...state, isPwdKeepDefault: true};
        case BREAK_PWD_DEFAULT:
            return {...state, isPwdKeepDefault: false};
        case KEEP_USERNAME_DEFAULT:
            return {...state, isUsernameKeepDefault: true};
        case BREAK_USERNAME_DEFAULT:
            return {...state, isUsernameKeepDefault: false};
        case BE_EMPTY_USERNAME:
            return {...state, isUsernameEmpty: true};
        case NOT_BE_EMPTY_USERNAME:
            return {...state, isUsernameEmpty: false};
        case BE_EMPTY_PWD:
            return {...state, isPwdEmpty: true};
        case NOT_BE_EMPTY_PWD:
            return {...state, isPwdEmpty: false};
        case ON_PWD_CHANGE:
            return {...state, password: data};
        case ON_USERNAME_CHANGE:
            return {...state, username: data};
        default:
            return state;
    }
}