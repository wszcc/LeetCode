export enum ActionTypes {
    ToPhoneLoginForm = 'phoneLoginForm',
    ToPwdLoginForm = 'pwdLoginForm',
    ToEmailRegisterForm = 'emailRegisterForm',
    ToResetPwdForm = 'resetPwdForm',
    ToUSALoginForm = 'usaLoginForm'
}

export interface IAction {
    type: ActionTypes
}

export const toPhoneLoginForm = (): IAction => ({ type: ActionTypes.ToPhoneLoginForm });
export const toPwdLoginForm = (): IAction => ({ type: ActionTypes.ToPwdLoginForm });
export const toEmailRegisterForm = (): IAction => ({ type: ActionTypes.ToEmailRegisterForm });
export const toResetPwdForm = (): IAction => ({ type: ActionTypes.ToResetPwdForm });
export const ToUSALoginForm = (): IAction => ({ type: ActionTypes.ToUSALoginForm });