// 限制 action 对象的 type 取值
export enum ActionTypes {
    KEEP_CAPTCHA_DEFAULT = 'keepCaptchaDefault',
    BREAK_CAPTCHA_DEFAULT = 'breakCaptchaDefault',

    BE_EMPTY_CAPTCHA = 'beEmptyCaptcha',
    NOT_BE_EMPTY_CAPTCHA = 'notBeEmptyCaptcha',

    LOADING = 'loading',
    CANCEL_LOADING = 'cancelLoading',

    COUNT_DOWN = 'countDown',

    COUNT_DOWN_END = 'countDownEnd',
    ON_CAPTCHA_CHANGE = 'onCaptchaChange'
}

// 规范 action 对象属性
export interface IAction {
    type: ActionTypes;
    data?: string
}

export const keepCaptchaDefault = (): IAction => ({type: ActionTypes.KEEP_CAPTCHA_DEFAULT});
export const breakCaptchaDefault = (): IAction => ({type: ActionTypes.BREAK_CAPTCHA_DEFAULT});
export const beEmptyCaptcha = (): IAction => ({type: ActionTypes.BE_EMPTY_CAPTCHA});
export const notBeEmptyCaptcha = (): IAction => ({ type: ActionTypes.NOT_BE_EMPTY_CAPTCHA});
export const loading = (): IAction => ({ type: ActionTypes.LOADING});
export const cancelLoading = (): IAction => ({ type: ActionTypes.CANCEL_LOADING});
export const countDown = (): IAction => ({ type: ActionTypes.COUNT_DOWN});
export const countDownEnd = (): IAction => ({ type: ActionTypes.COUNT_DOWN_END});
export const onCaptchaChange = (data: string): IAction => ({ type: ActionTypes.ON_CAPTCHA_CHANGE, data});

