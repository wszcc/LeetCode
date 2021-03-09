import { IEmailRegisterParams } from "../../components/LoginMain/types";

export enum ActionTypes {
    // 由 saga dispacth，reducer 监听
    RegisterLoading = 'registerLoading',
    CancelRegisterLoading = 'cancelRegisterLoading',
    RegisterSuccess = 'registerSuccess',
    InvalidCaptcha = 'invalidCaptcha',
    ExistedEmail = 'existedEmail',

    // 在组件内 dispacth， saga 监听
    Register = 'register',
}


export interface IAction {
    type: ActionTypes;
    payload?: any;
}

export interface IRegisterAction {
    type: ActionTypes.Register;
    payload: IEmailRegisterParams;
}

export const register = (payload: IEmailRegisterParams): IRegisterAction => ({ type: ActionTypes.Register, payload });
export const registerLoading = (): IAction => ({ type: ActionTypes.RegisterLoading });
export const cancelRegisterLoading = (): IAction => ({ type: ActionTypes.CancelRegisterLoading });
export const registerSuccess = (): IAction => ({ type: ActionTypes.RegisterSuccess });
export const invalidCaptcha = (): IAction => ({ type: ActionTypes.InvalidCaptcha });
export const existedEmail = (): IAction => ({ type: ActionTypes.ExistedEmail })