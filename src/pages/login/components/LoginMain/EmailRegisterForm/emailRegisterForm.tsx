import React, { CSSProperties, useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import request from '../../../../../apis/index'
import './style.scss';
import { useCaptcha } from '../../../../../utils/hooks';


interface IBaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}

interface IFormValues {
    email: string,
    password: string,
    captcha: string
}

enum InputType {
    Email = 'email',
    Password = 'password',
    Captcha = 'captcha'
}

interface IValueObj {
    email?: string;
    password?: string;
    captcha?: string;
}

const EmailRegisterForm: React.FC<IBaseProps> = (props) => {
    const { style } = props;

    const [isPwdInputOnBlur, setIsPwdInputOnBlur] = useState(false);
    const [isEmailInputOnBlur, setIsEmailInputOnBlur] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');



    const onFinish = (values: IFormValues) => {
        const { email, password, captcha } = values;
        console.log(email, password, captcha);

        request.post('/user/register', {
            registerBody: email,
            password,
            authCode: Number(captcha),
            method: 'email'

        }).then(value => {
            message.success('注册成功！')
        }).catch(reason => {
            console.log(reason);
        });
    }

    const onValuesChange = (valueObj: IValueObj) => {
        const changeType = Object.keys(valueObj)[0];
        switch(changeType) {
            case InputType.Email:
                const email = valueObj.email as string;
                setEmail(email)
                break;
            case InputType.Password:
                const password = valueObj.password as string;
                setPassword(password)
                break;
            case InputType.Captcha:
                const captcha = valueObj.captcha as string;
                setCaptcha(captcha)
                break;
        }
    }

    const [getCaptcha, IBtnStatus] = useCaptcha('email', email, 5, []);

    return (
        <Form
            className='email-register-form'
            style={style}
            initialValues={{
                email: '',
                password: '',
                captcha: ''
            }}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
        >
            <Form.Item
                className='email-register-form-item email-register-email-item'
                name='email'
                rules={[
                    { required: true, message: '请输入邮箱', validateTrigger: 'onBlur' },
                    (/* { getFieldValue } */) => ({
                        validator(_, value) {
                            const email = value as string;

                            const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                            const isValid = reg.test(email);
                            if (!isValid && isEmailInputOnBlur && email != '') {
                                return Promise.reject(new Error('邮箱地址不合法'))
                            }

                            return Promise.resolve();
                        },
                    })

                ]}
                validateTrigger={['onChange', 'onBlur']}
            >
                <Input
                    className='email-register-input email-register-email-input'
                    placeholder='输入邮箱'
                    onBlur={() => setIsEmailInputOnBlur(true)}
                    onFocus={() => setIsEmailInputOnBlur(false)}
                />
            </Form.Item>

            <Form.Item
                className='email-register-form-item email-register-password-item'
                name='password'
                rules={[
                    { required: true, message: '请输入密码', validateTrigger: 'onBlur' },
                    (/* { getFieldValue } */) => ({
                        validator(_, value) {
                            const password = value as string;

                            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
                            const isValid = reg.test(password) && password.length >= 8;
                            if (!isValid && isPwdInputOnBlur && password != '') {
                                return Promise.reject(new Error('密码须为不小于8位的数字及字母组合'))
                            }
                            return Promise.resolve();
                        }
                    })
                ]}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Input.Password
                    className='email-register-input email-register-password-input'
                    placeholder='输入密码'
                    onBlur={() => setIsPwdInputOnBlur(true)}
                    onFocus={() => setIsPwdInputOnBlur(false)}
                />
            </Form.Item>
            <div className='captcha-item-warp'>
                <Form.Item
                    className='email-register-form-item email-register-captcha-item input-item'
                    name='captcha'
                    rules={[
                        { required: true, message: '请输入验证码', validateTrigger: 'onBlur' }
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                >
                    <Input
                        className='email-register-input email-register-captcha-input'
                        placeholder='输入验证码'
                    />

                </Form.Item>


                <Form.Item
                    className='email-register-form-item email-register-captcha-item button-item'
                >
                    <Button
                        onClick={getCaptcha}
                        // loading={true}
                        {...IBtnStatus.btnProps}
                    >
                        {IBtnStatus.children}
                </Button>
                </Form.Item>
            </div>

            <Form.Item
                className='email-register-form-item email-register-btn-item'
            >
                <Button
                    className='email-register-input email-register-btn-input'
                    type='primary'
                    htmlType='submit'
                >
                    注册
                </Button>
            </Form.Item>





        </Form>
    )
}

export default EmailRegisterForm;
