import React, {CSSProperties} from 'react'

import {Form, Button, Input} from 'antd'
import './style.scss'

interface IBaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}

const USALoginForm: React.FC<IBaseProps> = (props) => {

    const {style} = props;

    return (
        <Form 
            className='usa-login-form'
            name="basic"
            style={style}
        >
            <Form.Item 
                className='usa-login-form-item usa-login-username-item'
                name='username'
                rules={[{ required: true, message: '请输入手机号或邮箱' }]}
            >
                <Input 
                    className='usa-login-input usa-login-username-input'
                    placeholder='用户名或邮箱'
                />
            </Form.Item>

            <Form.Item 
                className='usa-login-form-item usa-login-password-item'
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password
                    className='usa-login-input usa-login-password-input'
                    placeholder='输入密码'
                />
            </Form.Item>

            <Form.Item
                className='usa-login-form-item usa-login-btn-item'
            >
                <Button
                    className='usa-login-input usa-login-btn-input'
                    type='primary'
                    htmlType='submit'
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

export default USALoginForm;
