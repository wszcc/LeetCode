
import { Form, Button, Input } from 'antd';
import React, { CSSProperties } from 'react';
import request from '../../../../../apis';
import { storage } from '../../../../../utils/shared';
import { ILoginParams, Method } from '../types';
import './style.scss'


interface IFormValues {
    username: string,
    password: string
}

interface IBaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}


const PhoneLoginForm: React.FC<IBaseProps> = (props) => {
    const [form] = Form.useForm();

    // 将表单填入的信息提交
    const onFinish = (values: IFormValues) => {
        const {username, password} = values;

        const params: ILoginParams = {
            registerBody: username,
            password,
            method: Method.Email
        }   

        request.post('/user/login', params).then(value => {
            console.log(value);
            console.log(storage.get('token'));
            
        }).catch(err => {
            console.log(err);
        })
    }

    const onValuesChange = (value: {username: string} | {password: string}) => {
        
    }
   
    return (
        <Form
            className='pwd-login-form'
            name='pwd_login_form'
            form={form}
            initialValues={{
                username: '',
                password: ''
            }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            style={props.style}
        >
            <Form.Item
                className='pwd-login-form-item username-input-item'
                name='username'
                rules={[
                    {required: true, message: '请输入手机号或邮箱', validateTrigger: 'onBlur'}
                ]}
                validateTrigger={['onChange', 'onBlur']}

            >
                <Input 
                    className='username-input' 
                    placeholder='手机号 / 邮箱' 
                />
            </Form.Item>



            <Form.Item
                className='pwd-login-form-item password-input-item'
                name="password"
                rules={[
                    {required: true, message: '请输入密码', validateTrigger: 'onBlur'}
                ]}
                validateTrigger={['onChange', 'onBlur']}
            >
                <Input.Password 
                    className='password-input' 
                    placeholder='输入密码' 
                />
            </Form.Item>


            <Form.Item
                className='pwd-login-form-item primary-button-item'
            >
                <Button 
                    // loading={true}
                    className='primary-button' 
                    type='primary' 
                    htmlType='submit'
                    style={{ width: '100%' }}
                >
                    登录
                </Button>

            </Form.Item>
        </Form>
    )
}

export default PhoneLoginForm;

