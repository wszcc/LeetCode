import React, { CSSProperties, useState } from 'react'
import { Form, Input, Button } from 'antd'
import request from '../../../../../apis/index'
import './style.scss';


interface IBaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}

interface IFormValues {
    email: string,
    password: string,
    captcha: string
}

const EmailRegisterForm: React.FC<IBaseProps> = (props) => {
    const {style} = props;

    const [isPwdInputOnBlur, setIsPwdInputOnBlur] = useState(false);
    const [isEmailInputOnBlur, setIsEmailInputOnBlur] = useState(false);




    const onFinish = (values: IFormValues) => {
        const {email, password} = values;

        // request.post('user/register', {
        //     registerBody: email,
        //     password,
        //     authcode: '123',
        //     method: 'email'
        // }).then(values => {
        //     console.log(values);
        // }).catch(err => {
        //     console.log(err);
        // })

        console.log(values);
    }

    const onValuesChange = (values: IFormValues) => {
        // console.log(values);
    }

    const getCaptcha = () => {
        // request.post('user/requestcode')
    }

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

            <Form.Item
                className='email-register-form-item email-register-captcha-item'
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

            <Form.Item>
                <Button 
                    onClick={getCaptcha}
                >
                    获取验证码
                </Button>
            </Form.Item>

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
