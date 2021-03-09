import { ILoginParams } from "../../components/LoginMain/types";

export enum ActionTypes {
    
    // 由 saga dispacth
    ErrorLogin = 'errorLogin',
    SuccessLogin = 'successLogin',
    LoginLoading = 'loginLoading',
    CancelLoginLoading = 'cancelLoginLoading',

    // 在组件内 dispacth
    Login = 'login',
}

export interface IAction {
    type: ActionTypes;
    payload?: any;
}

export interface IActionCreator {
    (payload?: any): IAction;
}


export interface ILoginAction {
    type: ActionTypes.Login;
    payload?: ILoginParams
}

interface ILoginActionCreator {
    (payload: ILoginParams): {
        type: ActionTypes.Login,
        payload: ILoginParams
    };
}



export const login: ILoginActionCreator = (payload) => ({ type: ActionTypes.Login, payload });
export const errorLogin: IActionCreator = () => ({ type: ActionTypes.ErrorLogin });
export const successLogin: IActionCreator = () => ({ type: ActionTypes.SuccessLogin });
export const loginLoading: IActionCreator = () => ({ type: ActionTypes.LoginLoading });
export const cancelLoginLoading: IActionCreator = () => ({ type: ActionTypes.CancelLoginLoading });
