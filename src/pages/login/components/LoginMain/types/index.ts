export enum Method {
    Email = 'email',
    Phone = 'phone'
}


/* 请求参数 */
// 登录
export interface ILoginParams {
    registerBody: string;
    password: string;
    method: Method;
}

// 邮箱注册
export interface IEmailRegisterParams {
    registerBody: string;
    password: string;
    authCode: number;
    method: Method.Email;
}

// 获取验证码
export interface IGetCaptchaParams {
    number: string;
    method: Method;
}

// 忘记密码
export interface IResetPwd {
    forgetBody: string;
    newPassword: string;
    code: string;
    method: Method;
}


/* 响应内容 */
// 登录成功
export interface ILoginSuccessData {
    code: number;
    data: {
        avatar: string,
        nickname: string,
        sex: '1' | '0'
    };
    message: 'OK';
}

