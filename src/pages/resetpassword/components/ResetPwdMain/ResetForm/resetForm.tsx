import React from 'react';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { notification, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import request from '../../../../../apis';
import { IGetCaptchaParams, Method, IResetPwdParams } from '../../../../login/components/LoginMain/types';
import './style.scss'
import { useHistory } from 'react-router';


export enum ResetFormTypes {
    ByPhoneReset = 'byPhoneReset',
    ByEmailReset = 'byEmailReset'
}



interface OtherProps {
    style?: { [key: string]: string };
    [key: string]: any;
}

interface BaseResetFormProps extends OtherProps {
    type: ResetFormTypes;
}

const ResetForm: React.FC<BaseResetFormProps> = (props) => {

    const {
        type,
        style
    } = props;

    const history = useHistory();

    const openNotification = () => {
        notification.open({
            message: 'Notice',
            description:
                '我们已经给您发送了一封电子邮件，请稍等片刻。如果过了10分钟后还未收到，请及时联系我们。',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 5,
            placement: 'topLeft'
        });
    };


    if (type === ResetFormTypes.ByPhoneReset) {
        return (
            <ProForm
                style={style}
                onFinish={async (value) => {
                    // await waitTime(2000);
                    console.log(value);
                    // message.success('');
                }}
                submitter={{
                    searchConfig: {
                        submitText: '重设我的密码',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'middle',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <ProFormText
                    fieldProps={{
                        size: 'middle',
                        // prefix: <MobileOutlined />,
                    }}
                    name="phone"
                    placeholder="手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号',
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: '不合法的手机号格式',
                        },
                    ]}
                />

                <ProFormText.Password
                    fieldProps={{
                        size: 'middle',
                        // prefix: <MobileOutlined />,
                    }}
                    name="password"
                    placeholder="新密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入新密码',
                        },
                        {
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/,
                            message: '密码须为不小于8位的数字及字母组合',
                        },
                    ]}
                />
                <ProFormCaptcha
                    fieldProps={{
                        size: 'middle',
                        // prefix: <MailOutlined />,
                    }}
                    captchaProps={{
                        size: 'middle',
                    }}
                    phoneName="phone"
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                    placeholder="验证码"
                    onGetCaptcha={async (phone) => {
                        // const params: IGetCaptchaParams = {
                        //     number: phone,
                        //     method: Method.Phone
                        // }
                        // try {
                        //     const res = await request.post('/user/requestcode', params);
                        //     console.log(res);
                        // } catch (err) {
                        //     console.log(err);
                        // }
                        // // await waitTime(1000);
                        // message.success(`手机号 ${phone} 验证码发送成功`);

                        console.log('手机号发送验证码接口未开通');
                    }}
                />
            </ProForm>
        );
    } else {
        return (
            <ProForm
                style={style}
                onFinish={async (value) => {
                    const {email, password, captcha} = value;
                    const params: IResetPwdParams = {
                        forGetBody: email,
                        newPassword: password,
                        code: captcha,
                        method: Method.Email
                    };

                    try {
                        const res = await request.post('/user/forget', params);
                        message.success('重设成功');

                        setTimeout(() => {
                            history.push('/login');
                        }, 1000)
                        

                        console.log(res);
                    } catch (err) {
                        console.log(err);
                    }
                }}
                submitter={{
                    searchConfig: {
                        submitText: '重设我的密码',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'middle',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <ProFormText
                    fieldProps={{
                        size: 'middle',
                    }}
                    name="email"
                    placeholder="邮箱地址"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱',
                        },
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '不合法的邮箱格式',
                        },
                    ]}
                />

                <ProFormText.Password
                    fieldProps={{
                        size: 'middle',
                        // prefix: <MobileOutlined />,
                    }}
                    name="password"
                    placeholder="新密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入新密码',
                        },
                        {
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/,
                            message: '密码须为不小于8位的数字及字母组合',
                        },
                    ]}
                />

                <ProFormCaptcha
                    fieldProps={{
                        size: 'middle',
                        // prefix: <MailOutlined />,
                    }}
                    captchaProps={{
                        size: 'middle',
                    }}
                    
                    phoneName="email"
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                    placeholder="验证码"
                    onGetCaptcha={async (email) => {
                        // await waitTime(1000);
                        const params: IGetCaptchaParams = {
                            number: email,
                            method: Method.Email
                        }
                        try {
                            const res = await request.post('/user/requestcode', params);
                            openNotification();
                            console.log(res);
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                />

            </ProForm>
        );
    }

}

export default ResetForm;