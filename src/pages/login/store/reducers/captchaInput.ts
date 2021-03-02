
import {
    ActionTypes,
    IAction
} from '../actions/captchaInput'

export interface IState {
    isKeepDefault: boolean,
    isEmpty: boolean,
    isLoading: boolean,
    isCountDown: boolean,
    captcha: string | undefined
}

 
const initState: IState = {
    isKeepDefault: true,
    isEmpty: true, 
    isLoading: false, 
    isCountDown: false, 
    captcha: ''
}

export default function captchaInput(state: IState = initState, action: IAction): IState {
    const { type, data } = action;

    switch (type) {
        case ActionTypes.KEEP_CAPTCHA_DEFAULT:
            return {...state, isKeepDefault: true};

        case ActionTypes.BREAK_CAPTCHA_DEFAULT:
            return {...state, isKeepDefault: false};

        case ActionTypes.BE_EMPTY_CAPTCHA:
            return {...state, isEmpty: true};

        case ActionTypes.NOT_BE_EMPTY_CAPTCHA:
            return {...state, isEmpty: false};

        case ActionTypes.LOADING: 
            return {...state, isLoading: true};

        case ActionTypes.CANCEL_LOADING:
            return {...state, isLoading: false};

        case ActionTypes.COUNT_DOWN: 
            return {...state, isCountDown: true};

        case ActionTypes.COUNT_DOWN_END:
            return {...state, isCountDown: false};

        case ActionTypes.ON_CAPTCHA_CHANGE:
            return {...state, captcha: data};

        default:
            return state;
    }
}