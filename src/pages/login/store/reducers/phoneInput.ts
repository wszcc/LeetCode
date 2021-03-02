
import {ActionTypes, IAction} from '../actions/phoneInput'

export interface IState {
    isKeepDefault: boolean,
    isEmpty: boolean,
    isInvalid: boolean,
    isOnBlur: boolean,
    phone: string | undefined,
    select: string | undefined
}

export const initState: IState = {
    isKeepDefault: true,
    isEmpty: true, 
    isInvalid: true, 
    isOnBlur: true, 
    phone: '', 
    select: '+86'
}

export default function phoneInput(state: IState = initState, action: IAction): IState {
    const {type, data} = action;
    switch (type) {
        case ActionTypes.KEEP_PHONE_DEFAULT: 
            return {...state, isKeepDefault: true};
            
        case ActionTypes.BREAK_PHONE_DEFAULT:
            return {...state, isKeepDefault: false};
            
        case ActionTypes.BE_EMPTY_NUMBER: 
            return {...state, isEmpty: true};
            
        case ActionTypes.NOT_BE_EMPTY_NUMBER:
            return {...state, isEmpty: false};
            
        case ActionTypes.BE_INVALID_NUMBER:
            return {...state, isInvalid: true};
            
        case ActionTypes.NOT_BE_INVALID_NUMBER:
            return {...state, isInvalid: false};
            
        case ActionTypes.BE_ON_BLUR:
            return {...state, isOnBlur: true};
            
        case ActionTypes.NOT_BE_ON_BLUR:
            return {...state, isOnBlur: false};
            
        case ActionTypes.ON_PHONE_CHANGE:
            return {...state, phone: data};
            
        case ActionTypes.ON_SELECT_CHANGE:
            return {...state, select: data};
            
        default:
            return state;
    }
}