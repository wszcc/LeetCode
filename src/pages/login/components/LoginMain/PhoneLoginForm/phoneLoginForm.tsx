import { Form, Button, message } from 'antd';
import React, { CSSProperties } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import PhoneInput, { IPhoneNumber } from './PhoneInput/phoneInput'
import CaptchaInput, { ICaptcha } from './CaptchaInput/captchaInput'
import { InvalidPhoneNumber, EmptyPhoneNumber, EmptyCaptcha } from '../ErrorInfo/errorInfo'
import { beEmptyCaptcha, breakCaptchaDefault } from '../../../store/actions/captchaInput'
import { beEmptyNumber, breakPhoneDefault } from '../../../store/actions/phoneInput'
import { IRootState } from '../../../store/reducers';
import './style.scss'


interface IMapState {
    isPhoneKeepDefault: boolean;
    isCaptchaKeepDefault: boolean;
    isInValidPhone: boolean;
    isPhoneEmpty: boolean;
    isCaptchaEmpty: boolean;
}

interface IMapDipatch {
    beEmptyCaptcha: () => void;
    breakCaptchaDefault: () => void;
    beEmptyNumber: () => void;
    breakPhoneDefault: () => void;
}

interface IBaseProps extends IMapState, IMapDipatch {
    children?: React.ReactNode;
    style?: CSSProperties;
}

const PhoneLoginForm: React.FC<IBaseProps> = (props) => {

    const [form] = Form.useForm();

    // state
    const {
        isPhoneKeepDefault,
        isCaptchaKeepDefault,
        isInValidPhone,
        isPhoneEmpty,
        isCaptchaEmpty
    } = props;


    // dispatch
    const {
        beEmptyCaptcha,
        breakCaptchaDefault,
        beEmptyNumber,
        breakPhoneDefault
    } = props;


    // const isPhoneInputOnBlur = useSelector(state => state.phoneInput.isOnBlur, shallowEqual);
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
    const onFinish = (values: {captcha: ICaptcha, phone: IPhoneNumber}) => {
        const { captcha: { number: captcha }, phone: { number: phone } } = values;
        if ( captcha === '') {
            breakCaptchaDefault();
            beEmptyCaptcha();
        }
        if (phone === '') {
            breakPhoneDefault();
            beEmptyNumber();
        }

        // message.error('验证码错误，请重新验证');
        console.log(values);
    }



    return (
        <Form
            className='phone-login-form'
            name='phone_login_form'
            onFinish={onFinish}
            form={form}
            initialValues={{
                phone: {
                    select: '+86',
                    number: ''
                },
                captcha: {
                    number: ''
                }
            }}
            style={props.style}
        >
            <Form.Item
                style={
                    isPhoneKeepDefault ? { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ } :
                        isPhoneEmpty ? { marginBottom: '40px' } :
                            isInValidPhone ? { marginBottom: '40px' } :
                                { marginBottom: '24px'/* , backgroundColor: '#E8F0FE' */ }
                }
                className='phone-login-form-item phone-input-item'
                name='phone'
                help={
                    isPhoneKeepDefault ? <></> :
                        isPhoneEmpty ? <EmptyPhoneNumber /> :
                            isInValidPhone ? <InvalidPhoneNumber /> :
                                <></>
                }
                validateStatus={
                    isPhoneKeepDefault ? 'success' :
                        isPhoneEmpty ? 'error' :
                        isInValidPhone ? 'error' : 'success'
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
                validateStatus={
                    isCaptchaKeepDefault ? 'success' :
                        isCaptchaEmpty ? 'error' : 'success'
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

const mapStateToProps = (state: IRootState): IMapState => ({
    isPhoneKeepDefault: state.phoneInput.isKeepDefault,
    isCaptchaKeepDefault: state.captchaInput.isKeepDefault,
    isInValidPhone: state.phoneInput.isInvalid,
    isPhoneEmpty: state.phoneInput.isEmpty,
    isCaptchaEmpty: state.captchaInput.isEmpty
});


const mapDispatchToProps = (dispatch: Dispatch): IMapDipatch => ({
    beEmptyCaptcha: () => void dispatch(beEmptyCaptcha()),
    breakCaptchaDefault: () => void dispatch(breakCaptchaDefault()),
    beEmptyNumber: () => void dispatch(beEmptyNumber()), 
    breakPhoneDefault: () => void dispatch(breakPhoneDefault())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneLoginForm);








