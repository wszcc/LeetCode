import {
    BE_EMPTY_CAPTCHA,
    NOT_BE_EMPTY_CAPTCHA,
    LOADING,
    CANCEL_LOADING,
    COUNT_DOWN,
    COUNT_DOWN_END,
    ON_CAPTCHA_CHANGE,
    KEEP_CAPTCHA_DEFAULT,
    BREAK_CAPTCHA_DEFAULT
} from '../constant'



const initState = {
    isKeepDefault: true,
    isEmpty: true, 
    isLoading: false, 
    isCountDown: false, 
    value: ''
}


export default function captchaInput(state = initState, action) {
    const {type, data} = action;

    switch (type) {
        case KEEP_CAPTCHA_DEFAULT:
            return {...state, isKeepDefault: true};
        case BREAK_CAPTCHA_DEFAULT:
            return {...state, isKeepDefault: false};
        case BE_EMPTY_CAPTCHA:
            return {...state, isEmpty: true};
        case NOT_BE_EMPTY_CAPTCHA:
            return {...state, isEmpty: false};
        case LOADING: 
            return {...state, isLoading: true};
        case CANCEL_LOADING:
            return {...state, isLoading: false};
        case COUNT_DOWN: 
            return {...state, isCountDown: true};
        case COUNT_DOWN_END:
            return {...state, isCountDown: false};
        case ON_CAPTCHA_CHANGE:
            return {...state, value: data};
        default:
            return state;
    }
}