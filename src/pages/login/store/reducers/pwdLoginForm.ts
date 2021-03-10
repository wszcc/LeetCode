import { message } from "_antd@4.13.1@antd";
import { IResponse } from "../../components/LoginMain/types";
import { ActionTypes, IAction } from "../actions/pwdLoginForm";

export interface IState {
    isLoading: boolean;
    /**
     * 0: 默认状态
     * 1: 登录成功 (账号密码匹配)
     * 2: 登录失败 (账号密码不匹配)
     * 
     * 注意：这里不用考虑网络错误的问题，网络错误问题应该在 api/index 里面封装了
     */
    status: 0 | 1 | 2;
    res: IResponse
}

const initState: IState = {
    isLoading: false,
    status: 0,
    res: {
        code: -1,
        data: '',
        message: ''
    }
}


export default function pwdLoginForm(state: IState = initState, action: IAction): IState {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.LoginLoading:
            return { ...state, isLoading: true };

        case ActionTypes.CancelLoginLoading:
            return { ...state, isLoading: false };

        case ActionTypes.SuccessLogin:
            // message.success('登录成功');
            return { ...state, status: 1, res: payload };

        case ActionTypes.ErrorLogin:
            message.error('账号或密码错误')
            return { ...state, status: 2, res: payload };

        default:
            return state;
    }
}