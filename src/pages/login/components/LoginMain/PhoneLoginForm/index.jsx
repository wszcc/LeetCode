import { Form, Button, message } from 'antd';
import React, { useEffect } from 'react';
import PhoneInput from './PhoneInput'
import CaptchaInput from './CaptchaInput'

import { InvalidPhoneNumber, EmptyPhoneNumber, EmptyCaptcha } from '../ErrorInfo'
import './index.scss'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { beEmptyCaptcha, breakCaptchaDefault } from '../../../store/actions/captchaInput'
import { beEmptyNumber, breakPhoneDefault } from '../../../store/actions/phoneInput'






const PhoneLoginForm = (props) => {
    const [form] = Form.useForm();


    const isPhoneKeepDefault = useSelector(state => state.phoneInput.isKeepDefault, shallowEqual);
    const isCaptchaKeepDefault = useSelector(state => state.captchaInput.isKeepDefault, shallowEqual);
    const isInValidPhoneNumber = useSelector(state => state.phoneInput.isInvalid, shallowEqual);
    const isPhoneEmpty = useSelector(state => state.phoneInput.isEmpty, shallowEqual);
    const isCaptchaEmpty = useSelector(state => state.captchaInput.isEmpty, shallowEqual);

    // const isPhoneInputOnBlur = useSelector(state => state.phoneInput.isOnBlur, shallowEqual);


    const dispacth = useDispatch()


    /* 

        需求：
            1. 用户在输入完手机号，并且失去该输入框焦点的时候，检测输入的手机号是否正确
                * 正确的手机号需要将输入框的背景变淡蓝色，并且使获取验证码的按钮解除 disabled
                * 输入错误的时候提示：error
                    * 用户再次进行输入的时候取消 error 保持默认状态
                
            2. 用户在点击按钮的检测手机号输入框和验证码输入框是否为空
                * 如果为空提示：error
    
    */


    // 将表单填入的信息提交
    const onFinish = (values) => {
        const { captcha: { captchaValue }, phone: { phoneNumber } } = values;
        if (captchaValue === '') {
            dispacth(breakCaptchaDefault());
            dispacth(beEmptyCaptcha());
        }
        if (phoneNumber === '') {
            dispacth(breakPhoneDefault());
            dispacth(beEmptyNumber());
        }

        // message.error('验证码错误，请重新验证');
        console.log(values);
    }


    // useEffect(() => {

    // }, []);


    return (
        <Form
            className='phone-login-form'
            name='phone_login_form'
            onFinish={onFinish}
            form={form}
            initialValues={{
                phone: {
                    selectValue: '+86',
                    phoneNumber: ''
                },
                captcha: {
                    captchaValue: ''
                }
            }}
            {...props}
        >
            <Form.Item
                style={
                    isPhoneKeepDefault ? { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ } :
                        isPhoneEmpty ? { marginBottom: '40px' } :
                            isInValidPhoneNumber ? { marginBottom: '40px' } :
                                { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ }
                }
                className='phone-login-form-item phone-input-item'
                name='phone'
                help={
                    isPhoneKeepDefault ? <></> :
                        isPhoneEmpty ? <EmptyPhoneNumber /> :
                            isInValidPhoneNumber ? <InvalidPhoneNumber /> :
                                <></>
                }
            >
                <PhoneInput />
            </Form.Item>



            <Form.Item
                style={
                    isCaptchaKeepDefault ? { marginBottom: '24px' } :
                        isCaptchaEmpty ? { marginBottom: '40px' } : { marginBottom: '24px' }
                }
                className='phone-login-form-item captcha-input-item'
                name="captcha"
                help={
                    isCaptchaKeepDefault ? <></> :
                        isCaptchaEmpty ? <EmptyCaptcha /> :
                            <></>
                }
            >
                <CaptchaInput />
            </Form.Item>


            <Form.Item
                className='phone-login-form-item primary-button-item'
            >
                <Button 
                    className='primary-button' 
                    type='primary' 
                    htmlType='submit' 
                    style={{ width: '100%' }}
                >
                    登录 / 注册
                </Button>
            </Form.Item>
        </Form>
    )
}



export default PhoneLoginForm








