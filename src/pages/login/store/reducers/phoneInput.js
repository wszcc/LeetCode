import {
    BE_EMPTY_NUMBER,
    NOT_BE_EMPTY_NUMBER,
    BE_INVALID_NUMBER,
    NOT_BE_INVALID_NUMBER,
    BE_ON_BLUR,
    NOT_BE_ON_BLUR,
    ON_PHONE_CHANGE,
    ON_SELECT_CHANGE,
    KEEP_PHONE_DEFAULT,
    BREAK_PHONE_DEFAULT
} from '../constant'

const initState = {
    isKeepDefault: true,
    isEmpty: true, 
    isInvalid: true, 
    isOnBlur: true, 
    inputValue: '', 
    selectValue: '+86'
}

export default function phoneInput(state = initState, action) {
    const {type, data} = action;
    switch (type) {
        case KEEP_PHONE_DEFAULT: 
            return {...state, isKeepDefault: true};
        case BREAK_PHONE_DEFAULT:
            return {...state, isKeepDefault: false};
        case BE_EMPTY_NUMBER: 
            return {...state, isEmpty: true};
        case NOT_BE_EMPTY_NUMBER:
            return {...state, isEmpty: false};
        case BE_INVALID_NUMBER:
            return {...state, isInvalid: true};
        case NOT_BE_INVALID_NUMBER:
            return {...state, isInvalid: false};
        case BE_ON_BLUR:
            return {...state, isOnBlur: true};
        case NOT_BE_ON_BLUR:
            return {...state, isOnBlur: false};
        case ON_PHONE_CHANGE:
            return {...state, inputValue: data};
        case ON_SELECT_CHANGE:
            return {...state, selectValue: data};
        default:
            return state;
    }
}