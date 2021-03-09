import { message } from "_antd@4.13.1@antd";
import { ActionTypes, IAction } from "../actions/emailRegisterForm";

export interface IState {
    isLoading: boolean;
    /**
     * 0: 默认状态
     * 1: 注册成功 (邮箱未注册过，且验证码正确)
     * 2: 验证码错误 
     * 3: 该邮箱已被注册
     *
     * 注意：这里不用考虑网络错误的问题，网络错误问题应该在 api/index 里面封装了
     */
    status: 0 | 1 | 2 | 3;
}


const initState: IState = {
    isLoading: false,
    status: 0
}

export default function emailRegisterForm(state: IState = initState, action: IAction): IState {
    const { type } = action;
    switch (type) {
        case ActionTypes.RegisterLoading:
            return { ...state, isLoading: true };
        case ActionTypes.CancelRegisterLoading:
            return { ...state, isLoading: false };

        case ActionTypes.RegisterSuccess:
            message.success('注册成功');
            return { ...state, status: 1 };
        case ActionTypes.InvalidCaptcha:
            message.error('验证码错误');
            return { ...state, status: 2 }
        case ActionTypes.ExistedEmail:
            message.error('该邮箱已被注册');
            return { ...state, status: 3 };
        default:
            return state;
    }
}