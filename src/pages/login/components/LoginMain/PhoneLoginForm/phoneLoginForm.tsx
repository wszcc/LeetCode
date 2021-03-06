import { Form, Button, message } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';
import PhoneInput, { IPhoneNumber } from './PhoneInput/phoneInput'
import CaptchaInput, { ICaptcha } from './CaptchaInput/captchaInput'
import './style.scss'


interface IBaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}


interface IFormValues {
    captcha: ICaptcha;
    phone: IPhoneNumber;
}


enum ItemHelpTypes {
    EmptyPhone = '请输入手机号',
    InvalidPhone = '请输入正确的手机号',
    EmptyCaptcha = '请输入验证码',
    NoneHelp = ''
}
export interface IValidator {
    validateStatus: 'success' | 'warning' | 'error' | 'validating';
    help: ItemHelpTypes
}


const PhoneLoginForm: React.FC<IBaseProps> = (props) => {

    const [form] = Form.useForm();
    const initalFormValues: IFormValues = {
        phone: {
            select: '+86',
            number: ''
        },
        captcha: {
            number: ''
        }
    };

    const initValidator: IValidator = {
        validateStatus: 'success',
        help: ItemHelpTypes.NoneHelp
    }

    const [isPhoneInputOnBlur, setPhoneIsInputOnBlur] = useState(false);
    const [isCaptchaInputOnBlur, setIsCaptchaInputOnBlur] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [phoneValidator, setPhoneValidator] = useState<IValidator>(initValidator);
    const [captchaValidator, setCaptchaValidator] = useState<IValidator>(initValidator);


    // 将表单填入的信息提交
    const onFinish = (values: IFormValues) => {
        const { captcha: { number: captcha }, phone: { number: phone } } = values;

        if (captcha === '') {
            setCaptchaValidator({ validateStatus: 'error', help: ItemHelpTypes.EmptyCaptcha });
        }

        if (phone === '') {
            setPhoneValidator({ validateStatus: 'error', help: ItemHelpTypes.EmptyPhone})
        }

        // message.error('验证码错误，请重新验证');
        // console.log(values);


    }


    const onValuesChange = (values: IFormValues) => {
        const phoneObj = values.phone;
        const captchaObj = values.captcha;
        if (phoneObj) {
            const number = phoneObj.number as string;
            const reg = /^1\d{10}$/;
            setIsPhoneValid(reg.test(number));
            
            setPhoneNumber(number);
        } else if (captchaObj) {
            const captcha = captchaObj.number as string;
            setCaptcha(captcha);
        }
    }

    useEffect(() => {
        setPhoneValidator({ validateStatus: 'success', help: ItemHelpTypes.NoneHelp });

        const reg = /^1\d{10}$/;
        const isValid = reg.test(phoneNumber);

        if (isPhoneInputOnBlur) {
            if (isValid || phoneNumber === '') {
                setPhoneValidator({ validateStatus: 'success', help: ItemHelpTypes.NoneHelp });
            } else {
                setPhoneValidator({ validateStatus: 'error', help: ItemHelpTypes.InvalidPhone});
            }
        }
    }, [phoneNumber, isPhoneInputOnBlur]);

    useEffect(() => {
        setCaptchaValidator({ validateStatus: 'success', help: ItemHelpTypes.NoneHelp });
    }, [captcha, isCaptchaInputOnBlur])



    return (
        <Form
            className='phone-login-form'
            name='phone_login_form'
            onFinish={onFinish}
            form={form}
            onValuesChange={onValuesChange}
            initialValues={initalFormValues}
            style={props.style}
        >
            <Form.Item
                className='phone-login-form-item phone-login-phone-item'
                name='phone'
                {...phoneValidator}
            >
                <PhoneInput
                    className='phone-login-input phone-login-phone-input'
                    setOnBlur={setPhoneIsInputOnBlur}
                    
                />
            </Form.Item>



            <Form.Item
                className='phone-login-form-item phone-login-captcha-item'
                name="captcha"
                {...captchaValidator}
            >
                <CaptchaInput
                    className='phone-login-input phone-login-captcha-input'
                    setOnBlur={setIsCaptchaInputOnBlur}
                    isPhoneValid={isPhoneValid}
                />
            </Form.Item>


            <Form.Item
                className='phone-login-form-item phone-login-btn-item'
                validateStatus='validating'
            >
                <Button
                    className='phone-login-input phone-login-btn-input'
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

export default PhoneLoginForm;








