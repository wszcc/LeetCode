import {ActionTypes, IAction} from '../actions/loginMain';

export enum FormTypes {
    PhoneLoginForm = 'phoneLoginForm',
    PwdLoginForm = 'pwdLoginForm',
    EmailRegisterForm = 'emailRegisterForm',
    ResetPwdForm = 'resetPwdForm',
    USALoginForm = 'usaLoginForm'
}

export interface IState {
    form: FormTypes;
}

const initState: IState = {
    form: FormTypes.PhoneLoginForm
}

export default function loginMain(state: IState = initState, action: IAction): IState {
    const {type} = action;
    switch(type) {
        case ActionTypes.ToPwdLoginForm:
            return {form: FormTypes.PwdLoginForm};

        case ActionTypes.ToPhoneLoginForm:
            return {form: FormTypes.PhoneLoginForm};

        case ActionTypes.ToEmailRegisterForm:
            return {form: FormTypes.EmailRegisterForm};

        case ActionTypes.ToResetPwdForm:
            return {form: FormTypes.ResetPwdForm};

        case ActionTypes.ToUSALoginForm:
            return {form: FormTypes.USALoginForm};

        default:
            return state;
    }
}


