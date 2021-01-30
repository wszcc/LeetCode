import {TO_PHONE_LOGIN, TO_PWD_LOGIN} from '../constant';
const initState = {isPhoneLogin: true};

export default function header(state = initState, action) {
    const {type, isPhoneLogin} = action;
    switch (type) {
        case TO_PHONE_LOGIN:
            return {isPhoneLogin}
        case TO_PWD_LOGIN:
            return {isPhoneLogin}
        default:
            return initState
    }
}