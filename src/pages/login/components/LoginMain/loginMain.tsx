import React, { useRef, useState } from 'react';
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import { Card, Button } from 'antd';
import { CaretRightOutlined, RightOutlined } from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import PhoneLoginForm from './PhoneLoginForm/phoneLoginForm'
import PwdLoginForm from './PwdLoginForm/pwdLoginForm'
import USALoginForm from './USALoginForm/usaLoginForm';
import {FormTypes} from '../../store/reducers/loginMain'
import {IRootState} from '../../store/reducers/index'
import { toEmailRegisterForm, toPhoneLoginForm, toPwdLoginForm, toResetPwdForm, ToUSALoginForm } from '../../store/actions/loginMain';
import './style.scss'
import EmailRegisterForm from './EmailRegisterForm/emailRegisterForm';

enum CardTitle {
    Welcome = '欢迎使用力扣',
    PwdLogin = '账号密码登录',
    EmailRegister = '邮箱注册',
    USAccountLogin = '美国站账号登录'
}

enum LinkBtnName {
    PwdLogin = '账号密码登录',
    CaptchaLogin = '验证码登录',
    EmailRegister = '邮箱注册',
    ForgetPwd = '忘记密码',
    HasUSAccount = '已有美国站账号',
    BackCH = '返回中文站账号登录'
}



interface IMapState {
    formType?: FormTypes
}

interface IMapDispatch {
    toPwdLoginForm: () => void;
    toPhoneLoginForm: () => void;
    toEmailRegisterForm: () => void;
    toResetPwdForm: () => void;
    toUSALoginForm: () => void;
}

interface IBaseProps extends IMapState, IMapDispatch {
    children?: React.ReactNode
}


const LoginMain: React.FC<IBaseProps> = (props) => {


    // state
    const {formType} = props;

    // dispatch
    const {
        toEmailRegisterForm,
        toPhoneLoginForm,
        toPwdLoginForm,
        toResetPwdForm,
        toUSALoginForm
    } = props;

    const betweenLinkBtnStyle = {
        display: formType === FormTypes.EmailRegisterForm ? 'none' :
                 formType === FormTypes.USALoginForm ? 'none' : 'block'
    }

    const centerLinkBtnStyle = {
        display: formType === FormTypes.PhoneLoginForm ? 'flex' :
                 formType === FormTypes.EmailRegisterForm ? 'flex' :
                 formType === FormTypes.USALoginForm ? 'flex' : 'none'
    }

    let history = useHistory();

    const leftConvert = () => {
        if (formType === FormTypes.PhoneLoginForm ) {
            toPwdLoginForm();
        } else {
            toPhoneLoginForm();
        }
    }

    const rightConvert = () => {
        if (formType === FormTypes.PwdLoginForm) {
            toPhoneLoginForm();
            history.push('/resetpassword');
        } else {
            toEmailRegisterForm();
        }
    }

    const centerConvert = () => {
        switch(formType) {
            case FormTypes.PhoneLoginForm: 
                toUSALoginForm();
                break;
            case FormTypes.USALoginForm:
                toPhoneLoginForm();
                break;
            case FormTypes.EmailRegisterForm:
                toPhoneLoginForm();
                break;
        }
    }

    return (
        <Card 
            className='login-window-main'
            title={
                formType === FormTypes.PhoneLoginForm ? CardTitle.Welcome :
                formType === FormTypes.PwdLoginForm ? CardTitle.PwdLogin : 
                formType === FormTypes.EmailRegisterForm ? CardTitle.EmailRegister :
                CardTitle.USAccountLogin 
            }
            bordered={false}
        >

            <PhoneLoginForm  style={{display: formType === FormTypes.PhoneLoginForm ? 'block' : 'none'}} />
            <PwdLoginForm style={{display: formType === FormTypes.PwdLoginForm ? 'block' : 'none'}} />
            <EmailRegisterForm style={{display: formType === FormTypes.EmailRegisterForm ? 'block' : 'none'}} />
            <USALoginForm style={{display: formType === FormTypes.USALoginForm ? 'block' : 'none'}} />

          <div className='link-button-warp'>
                <Button 
                    className='link-button' 
                    type='link' 
                    onClick={leftConvert}
                    style={betweenLinkBtnStyle}
                >
                    {
                        formType === FormTypes.PhoneLoginForm ? LinkBtnName.PwdLogin :
                        LinkBtnName.CaptchaLogin
                    }
                </Button>


                <Button 
                    className='link-button' 
                    type='link' 
                    onClick={rightConvert}
                    style={betweenLinkBtnStyle}
                >
                    {
                        formType === FormTypes.PhoneLoginForm ? LinkBtnName.EmailRegister : 
                        LinkBtnName.ForgetPwd
                    }
                </Button>
            </div>

            <div className='us-username' style={centerLinkBtnStyle}>
                <Button className='link-button' type='link' onClick={centerConvert}>
                    {
                        formType === FormTypes.PhoneLoginForm ? LinkBtnName.HasUSAccount : 
                        formType === FormTypes.USALoginForm ? LinkBtnName.BackCH :
                        LinkBtnName.CaptchaLogin
                    }
                    <CaretRightOutlined 
                        style={{ 
                            fontSize: '12px', marginLeft: '2px',
                            display: formType === FormTypes.PhoneLoginForm ? 'inline' : 'none'
                        }}     
                    />
                    <RightOutlined 
                        style={{ 
                            fontSize: '10px', marginLeft: '2px',
                            display: formType === FormTypes.USALoginForm ? 'inline' : 'none' 
                        }} 
                    />
                </Button>
            </div>
        </Card>
    )
}

const mapStateToProps = (state: IRootState): IMapState => ({
    formType: state.loginMain.form
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatch => ({
    toEmailRegisterForm: () => void dispatch(toEmailRegisterForm()),
    toPhoneLoginForm: () => void dispatch(toPhoneLoginForm()),
    toPwdLoginForm: () => void dispatch(toPwdLoginForm()),
    toResetPwdForm: () => void dispatch(toResetPwdForm()),
    toUSALoginForm: () => void dispatch(ToUSALoginForm())
    
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain);