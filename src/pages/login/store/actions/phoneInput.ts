export enum ActionTypes {
    BE_INVALID_NUMBER = 'beInvalidNumber',
    NOT_BE_INVALID_NUMBER = 'notBeInvalidNumber',
    BE_EMPTY_NUMBER = 'beEmptyNumber',
    NOT_BE_EMPTY_NUMBER = 'notBeEmptyNumber',
    BE_ON_BLUR = 'beOnBlur',
    NOT_BE_ON_BLUR = 'notBeOnBlur',
    ON_PHONE_CHANGE = 'onPhoneChange',
    ON_SELECT_CHANGE = 'onSelectChange',
    KEEP_PHONE_DEFAULT = 'keepPhoneDefault',
    BREAK_PHONE_DEFAULT =  'breakPhoneDefault'
}


// 规范 action 对象属性
export interface IAction {
    type: ActionTypes;
    data?: string;
}

export const keepPhoneDefault = (): IAction => ({type:ActionTypes.KEEP_PHONE_DEFAULT});
export const breakPhoneDefault = (): IAction => ({type:ActionTypes.BREAK_PHONE_DEFAULT});
export const beInvalidNumber = (): IAction => ({type:ActionTypes.BE_INVALID_NUMBER});
export const notBeInvalidNumber = (): IAction => ({type:ActionTypes.NOT_BE_INVALID_NUMBER});
export const beEmptyNumber = (): IAction => ({type: ActionTypes.BE_EMPTY_NUMBER});
export const notBeEmptyNumber = (): IAction => ({ type: ActionTypes.NOT_BE_EMPTY_NUMBER});
export const beOnBlur = (): IAction => ({ type: ActionTypes.BE_ON_BLUR});
export const notBeOnBlur = (): IAction => ({ type: ActionTypes.NOT_BE_ON_BLUR});
export const onPhoneChange = (data: string): IAction => ({ type: ActionTypes.ON_PHONE_CHANGE, data});
export const onSelectChange = (data: string): IAction => ({ type: ActionTypes.ON_SELECT_CHANGE, data});