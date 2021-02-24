import { Form, Button, Input } from 'antd';
import React, { useEffect } from 'react';

import { EmptyUsername, EmptyPassword } from '../ErrorInfo'
import './index.scss'


import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    beEmptyPwd,
    beEmptyUername,
    beInvalid,
    notBeEmptyPwd,
    notBeEmptyUsername,
    notBeInvalid,
    breakPwdDefault,
    breakUsernameDefault,
    keepPwdDefault,
    keepUsernameDefault,
    onPwdChange,
    onUsernameChange
} from '../../../store/actions/pwdLoginForm'




const PhoneLoginForm = (props) => {
    const [form] = Form.useForm();


    const isUsernameKeepDefault = useSelector(state => state.pwdLoginForm.isUsernameKeepDefault, shallowEqual);
    const isPwdKeepDefault = useSelector(state => state.pwdLoginForm.isPwdKeepDefault, shallowEqual);
    const isInValid = useSelector(state => state.pwdLoginForm.isInvalid, shallowEqual);
    const isUsernameEmpty = useSelector(state => state.pwdLoginForm.isUsernameEmpty, shallowEqual);
    const isPwdEmpty = useSelector(state => state.pwdLoginForm.isPwdEmpty, shallowEqual);
    const username = useSelector(state => state.pwdLoginForm.username, shallowEqual);
    const password = useSelector(state => state.pwdLoginForm.password, shallowEqual);

    const dispacth = useDispatch()


    // 将表单填入的信息提交
    const onFinish = () => {
        // const { username, password } = values;
        if (username === '') {
            dispacth(breakUsernameDefault());
            dispacth(beEmptyUername());
        }
        if (password === '') {
            dispacth(breakPwdDefault());
            dispacth(beEmptyPwd());
        }

        console.log(username, password);
    }

    useEffect(() => {

        return () => {
        }
    }, []);

    const listenUsername = e => {
        dispacth(keepUsernameDefault());

        let username = e.target.value;

        // 更新 username
        dispacth(onUsernameChange(username));

        // isEmpty
        const isEmpty = username === '';
        if (isEmpty) dispacth(beEmptyUername());
        else dispacth(notBeEmptyUsername());
    }
    const listenPassword = e => {
        dispacth(keepPwdDefault());

        let password = e.target.value;

        // 更新 password
        dispacth(onPwdChange(password));

        // isEmpty
        const isEmpty = password === '';
        if (isEmpty) dispacth(beEmptyPwd());
        else dispacth(notBeEmptyPwd());
    }
   




    return (
        <Form
            className='pwd-login-form'
            name='pwd_login_form'
            // onFinish={onFinish}
            form={form}
            initialValues={{
                username: '',
                password: ''
            }}
            {...props}
        >
            <Form.Item
                className='pwd-login-form-item username-input-item'
                name='username'
                style={
                    isUsernameKeepDefault ? { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ } :
                        isUsernameEmpty ? { marginBottom: '40px' } :
                            { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ }
                }
                help={
                    isUsernameKeepDefault ? <></> :
                        isUsernameEmpty ? <EmptyUsername /> :
                            <></>
                }
            >
                <Input className='username-input' placeholder='手机号 / 邮箱'onChange={listenUsername} />
            </Form.Item>



            <Form.Item
                className='pwd-login-form-item password-input-item'
                name="password"
                style={
                    isPwdKeepDefault ? { marginBottom: '24px' } :
                        isPwdEmpty ? { marginBottom: '40px' } : { marginBottom: '24px' }
                }
                help={
                    isPwdKeepDefault ? <></> :
                        isPwdEmpty ? <EmptyPassword /> :
                            <></>
                }
            >
                <Input.Password className='password-input' placeholder='输入密码' onChange={listenPassword} />
            </Form.Item>


            <Form.Item
                className='pwd-login-form-item primary-button-item'
            >
                <Button 
                    // loading={true}
                    className='primary-button' 
                    type='primary' 
                    onClick={onFinish} 
                    style={{ width: '100%' }}>登录</Button>
            </Form.Item>
        </Form>
    )
}



export default PhoneLoginForm