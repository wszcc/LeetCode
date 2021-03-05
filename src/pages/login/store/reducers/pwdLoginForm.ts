import {ActionTypes, IAction} from '../actions/pwdLoginForm'


export interface IState {
    isUsernameKeepDefault: boolean;
    isPwdKeepDefault: boolean;
    isInvalid: boolean;
    isUsernameEmpty: boolean;
    isPwdEmpty: boolean;
    username: string | undefined;
    password: string | undefined;
} 


const initState: IState = {
    isUsernameKeepDefault: true,
    isPwdKeepDefault: true,
    isInvalid: true,
    isUsernameEmpty: true,
    isPwdEmpty: true,
    username: '',
    password: ''
};

export default function pwdLoginForm(state: IState = initState, action: IAction): IState {
    const {type, data} = action;
    switch (type) {
        case ActionTypes.BE_INVALID: 
            return {...state, isInvalid: true};
        case ActionTypes.NOT_BE_INVALID:
            return {...state, isInvalid: false};
        case ActionTypes.KEEP_PWD_DEFAULT:
            return {...state, isPwdKeepDefault: true};
        case ActionTypes.BREAK_PWD_DEFAULT:
            return {...state, isPwdKeepDefault: false};
        case ActionTypes.KEEP_USERNAME_DEFAULT:
            return {...state, isUsernameKeepDefault: true};
        case ActionTypes.BREAK_USERNAME_DEFAULT:
            return {...state, isUsernameKeepDefault: false};
        case ActionTypes.BE_EMPTY_USERNAME:
            return {...state, isUsernameEmpty: true};
        case ActionTypes.NOT_BE_EMPTY_USERNAME:
            return {...state, isUsernameEmpty: false};
        case ActionTypes.BE_EMPTY_PWD:
            return {...state, isPwdEmpty: true};
        case ActionTypes.NOT_BE_EMPTY_PWD:
            return {...state, isPwdEmpty: false};
        case ActionTypes.ON_PWD_CHANGE:
            return {...state, password: data};
        case ActionTypes.ON_USERNAME_CHANGE:
            return {...state, username: data};
        default:
            return state;
    }
}