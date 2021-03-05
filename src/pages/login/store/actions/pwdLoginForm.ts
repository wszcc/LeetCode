export enum ActionTypes {
    BE_INVALID = 'beInvalid',
    NOT_BE_INVALID = 'notBeInvalid',
    BE_EMPTY_USERNAME = 'beEmptyUername',
    NOT_BE_EMPTY_USERNAME = 'notBeEmptyUsername',
    ON_USERNAME_CHANGE = 'onUsernameChange',
    ON_PWD_CHANGE = 'onPwdChange',
    BE_EMPTY_PWD = 'beEmptyPwd',
    NOT_BE_EMPTY_PWD = 'notBeEmptyPwd',
    KEEP_PWD_DEFAULT = 'keepPwdDefault',
    KEEP_USERNAME_DEFAULT = 'keepUsernameDefault',
    BREAK_PWD_DEFAULT = 'breakUsernameDefault',
    BREAK_USERNAME_DEFAULT = 'breakPwdDefault'
};

export interface IAction {
    type: ActionTypes;
    data?: string;
}

export const beInvalid = (): IAction => ({ type: ActionTypes.BE_INVALID})
export const notBeInvalid = (): IAction => ({ type: ActionTypes.NOT_BE_INVALID})

export const beEmptyUername = (): IAction => ({ type: ActionTypes.BE_EMPTY_USERNAME})
export const notBeEmptyUsername = (): IAction => ({ type: ActionTypes.NOT_BE_EMPTY_USERNAME})

export const beEmptyPwd = (): IAction => ({ type: ActionTypes.BE_EMPTY_PWD})
export const notBeEmptyPwd = (): IAction => ({ type: ActionTypes.NOT_BE_EMPTY_PWD})

export const onUsernameChange = (data: string): IAction => ({ type: ActionTypes.ON_USERNAME_CHANGE, data})
export const onPwdChange = (data: string): IAction => ({ type: ActionTypes.ON_PWD_CHANGE, data})

export const keepUsernameDefault = (): IAction => ({ type: ActionTypes.KEEP_USERNAME_DEFAULT})
export const breakUsernameDefault = (): IAction => ({ type: ActionTypes.BREAK_USERNAME_DEFAULT})

export const keepPwdDefault = (): IAction => ({ type: ActionTypes.KEEP_PWD_DEFAULT})
export const breakPwdDefault = (): IAction => ({ type: ActionTypes.BREAK_PWD_DEFAULT})


