
import { Form, Button, Input } from 'antd';
import React, { CSSProperties, useEffect } from 'react';
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../../store/actions/pwdLoginForm';
import { ILoginParams, Method } from '../types';
import { IRootState } from '../../../store/reducers';
import './style.scss'


interface IFormValues {
    username: string,
    password: string
}

interface IMappedState {
    isLoading: boolean;
    status: 0 | 1 | 2;
}

interface IMappedDispacth {
    login: (params: ILoginParams) => void;
}

interface IBaseProps extends IMappedState, IMappedDispacth {
    children?: React.ReactNode;
    style?: CSSProperties;
}


const PhoneLoginForm: React.FC<IBaseProps> = (props) => {
    const [form] = Form.useForm();
    let history = useHistory();

    
    const {
        // state
        isLoading,
        status,
        // dispatch
        login
    } = props;

    useEffect(() => {
        if (status === 1) {
            history.replace('/questionlist')
        }
    }, [status])


    // 将表单填入的信息提交
    const onFinish = (values: IFormValues) => {
        const {username, password} = values;

        const params: ILoginParams = {
            registerBody: username,
            password,
            method: Method.Email
        } 
        login(params);  
    }

    // const onValuesChange = (value: {username: string} | {password: string}) => {
        
    // }
   
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
            // onValuesChange={onValuesChange}
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
                    loading={isLoading}
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
const mapStateToProps = (state: IRootState): IMappedState => ({
    isLoading: state.pwdLoginForm.isLoading,
    status: state.pwdLoginForm.status
});

const mapDispacthToProps = (dispatch: Dispatch): IMappedDispacth => ({
    login: (params: ILoginParams) => dispatch(login(params)),
});

export default connect(mapStateToProps, mapDispacthToProps)(PhoneLoginForm);

