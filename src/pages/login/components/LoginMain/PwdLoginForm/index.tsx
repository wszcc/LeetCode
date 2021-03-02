/* 



*/


import { Form, Button, Input } from 'antd';
import React, { ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { EmptyUsername, EmptyPassword } from '../ErrorInfo/index'
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
} from '../../../store/actions/pwdLoginForm';

import {IState} from '../../../store/reducers/pwdLoginForm';
import { IRootState} from '../../../store/reducers/index'
import './index.scss'

interface BaseProps extends IState {
    children?: React.ReactNode;
    style?: {};
    [key: string]: any;
}

const PhoneLoginForm: React.FC<BaseProps> = (props) => {
    const [form] = Form.useForm();

    // state
    const {
        username,
        password,
        isInvalid,
        isPwdEmpty,
        isPwdKeepDefault,
        isUsernameEmpty,
        isUsernameKeepDefault
    } = props;

    // dispatch
    const {
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
        updateUsername,
        updatePassword
    } = props;

    // 将表单填入的信息提交
    const onFinish = () => {
        // const { username, password } = values;
        if (username === '') {
            breakUsernameDefault();
            beEmptyUername();
        }
        if (password === '') {
            breakPwdDefault();
            beEmptyPwd();
        }

        console.log(username, password);
    }

    useEffect(() => {

        return () => {
        }
    }, []);

    const listenUsername = (e: ChangeEvent<HTMLInputElement>) => {
        keepUsernameDefault();

        let username = e.target.value;

        // 更新 username
        updateUsername(username);

        // isEmpty
        const isEmpty = username === '';
        if (isEmpty) beEmptyUername();
        else notBeEmptyUsername();
    }
    const listenPassword = (e: ChangeEvent<HTMLInputElement>) => {
        keepPwdDefault();

        let password = e.target.value;

        // 更新 password
        updatePassword(password);

        // isEmpty
        const isEmpty = password === '';
        if (isEmpty) beEmptyPwd();
        else notBeEmptyPwd();
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
            style={props.style}
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
                validateStatus={
                    isUsernameKeepDefault ? 'success' :
                        isUsernameEmpty ? 'error' : 'success'
            
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
                validateStatus={
                    isPwdKeepDefault ? 'success' :
                        isPwdEmpty ? 'error' : 'success'
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


const mapStateToProps = (state: IRootState) => ({
    isUsernameKeepDefault: state.pwdLoginForm.isUsernameKeepDefault,
    isPwdKeepDefault: state.pwdLoginForm.isPwdKeepDefault,
    isInValid: state.pwdLoginForm.isInvalid,
    isUsernameEmpty: state.pwdLoginForm.isUsernameEmpty,
    isPwdEmpty: state.pwdLoginForm.isPwdEmpty,
    username: state.pwdLoginForm.username,
    password: state.pwdLoginForm.password
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateUsername: (value: string) => dispatch(onUsernameChange(value)),
    updatePassword: (value: string) => dispatch(onPwdChange(value)),

    beEmptyPwd: () => dispatch(beEmptyPwd()),
    notBeEmptyPwd: () => dispatch(notBeEmptyPwd()),

    beEmptyUername: () => dispatch(beEmptyUername()),
    notBeEmptyUsername: () => dispatch(notBeEmptyUsername()),

    beInvalid: () => dispatch(beInvalid()),
    notBeInvalid: () => dispatch(notBeInvalid()),

    keepPwdDefault: () => dispatch(keepPwdDefault()),
    breakPwdDefault: () => dispatch(breakPwdDefault()),

    keepUsernameDefault: () => dispatch(keepUsernameDefault()),
    breakUsernameDefault: () => dispatch(breakUsernameDefault())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneLoginForm);

