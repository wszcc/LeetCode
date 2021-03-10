import React, { CSSProperties, useEffect, useState } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { useCaptcha } from '../../../../../utils/hooks';
import { IEmailRegisterParams, ILoginParams, Method } from '../types';
import { IRootState } from '../../../store/reducers';
import { register } from '../../../store/actions/emailRegisterForm';
import { useHistory } from 'react-router';
import { login } from '../../../store/actions/pwdLoginForm';
import './style.scss';

interface IMappedState {
    isLoading: boolean;
    status: 0 | 1 | 2 | 3;
}

interface IMappedDispacth {
    register: (params: IEmailRegisterParams) => void;
    login: (params: ILoginParams) => void;
}

interface IBaseProps extends IMappedState, IMappedDispacth {
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

    // const history = useHistory();

    const {
        style,

        // state
        isLoading,
        status,

        // dispacth
        register
    } = props;



    const [isPwdInputOnBlur, setIsPwdInputOnBlur] = useState(false);
    const [isEmailInputOnBlur, setIsEmailInputOnBlur] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');



    const onFinish = (values: IFormValues) => {

        const { email, password, captcha } = values;

        const parmas: IEmailRegisterParams = {
            registerBody: email,
            password,
            authCode: Number(captcha),
            method: Method.Email
        }

        // console.log(parmas);

        register(parmas);
    }

    const onFinishFailed = (obj: any) => {
        console.log(obj);
    }
    const onValuesChange = (valueObj: IValueObj) => {
        const changeType = Object.keys(valueObj)[0];
        switch (changeType) {
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


    useEffect(() => {
        // 注册的状态
        // 1：自动登录
        if (status === 1) {
            login({
                registerBody: email,
                password: password,
                method: Method.Email
            });
        }
    }, [status])

    const [getCaptcha, IBtnStatus] = useCaptcha('email', email, 60, []);

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
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                // ref={emailItemRef}
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
                    loading={isLoading}
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

const mapStateToProps = (state: IRootState): IMappedState => ({
    isLoading: state.emailRegisterForm.isLoading,
    status: state.emailRegisterForm.status
});
const mapDispacthToProps = (dispacth: Dispatch): IMappedDispacth => ({
    register: (params: IEmailRegisterParams) => dispacth(register(params)),
    login: (params: ILoginParams) => dispacth(login(params))
});

export default connect(mapStateToProps, mapDispacthToProps)(EmailRegisterForm);
