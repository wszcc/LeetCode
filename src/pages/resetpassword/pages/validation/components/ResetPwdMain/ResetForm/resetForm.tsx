import React from 'react';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { Button, notification, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export enum ResetFormType {
    ByPhoneReset = 'byPhoneReset',
    ByEmailReset = 'byEmailReset'
}



interface OtherProps {
    style?: {[key: string]: string};
    [key: string]: any;
}

interface BaseResetFormProps extends OtherProps{
    type: ResetFormType;
}

const ResetForm: React.FC<BaseResetFormProps > = (props) => {

    const {
        type,
        style
    } = props;


    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };


    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                '我们已经给您发送了一封电子邮件，请稍等片刻。如果过了10分钟后还未收到，请及时联系我们。',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 5,
            placement: 'topLeft'
        });
    };

    
    if (type === ResetFormType.ByPhoneReset) {
        return (
            <ProForm
                style={style}
                onFinish={async () => {
                    await waitTime(2000);


                    // message.success('');
                }}
                submitter={{
                    searchConfig: {
                        submitText: '重设我的密码',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <ProFormText
                    fieldProps={{
                        size: 'large',
                        // prefix: <MobileOutlined />,
                    }}
                    name="phone"
                    placeholder="手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号!',
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: '不合法的手机号格式!',
                        },
                    ]}
                />
                <ProFormCaptcha
                    fieldProps={{
                        size: 'large',
                        // prefix: <MailOutlined />,
                    }}
                    captchaProps={{
                        size: 'large',
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
                        await waitTime(1000);
                        message.success(`手机号 ${phone} 验证码发送成功!`);
                    }}
                />
            </ProForm>
        );
    } else {
        return (
            <ProForm
                style={style}
                onFinish={async () => {
                    await waitTime(2000);
                    openNotification();
                }}
                submitter={{
                    searchConfig: {
                        submitText: '重设我的密码',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <ProFormText
                    fieldProps={{
                        size: 'large',
                        // prefix: <MobileOutlined />,
                    }}
                    name="phone"
                    placeholder="请输入邮箱"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '不合法的邮箱格式!',
                        },
                    ]}
                />

            </ProForm>
        );
    }

}

export default ResetForm;