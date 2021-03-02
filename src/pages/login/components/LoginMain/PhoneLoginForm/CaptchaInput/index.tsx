import { Input, Button } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { 
    beEmptyCaptcha, 
    notBeEmptyCaptcha, 
    loading, 
    cancelLoading, 
    countDown, 
    countDownEnd,
    onCaptchaChange,
    keepCaptchaDefault
} from '../../../../store/actions/captchaInput'
import {IRootState} from '../../../../store/reducers/index';

import './index.scss'

interface IMapState {
    captcha: string | undefined;
    isInvalidPhone: boolean;
    isLoading: boolean;
    isCountDown: boolean;
}

interface IMapDispatch {
    updateCaptcha: (value: string) => void;
    beEmptyCaptcha: () => void;
    notBeEmptyCaptcha: () => void;
    loading: () => void;
    cancelLoading: () => void;
    countDown: () => void;
    countDownEnd: () => void;
    keepCaptchaDefault: () => void;
}

export interface ICaptcha {
    captcha: string | undefined;
}

interface BaseProps extends IMapState, IMapDispatch {
    children?: React.ReactNode;
    style?: {};
    onChange?: (value: ICaptcha) => void;
    value?: ICaptcha;
}



const CaptchaInput: React.FC<BaseProps> = (props) => {


    const [seconds, setSeconds] = useState(5);

    const { onChange, value = {} } = props;


    // state
    const {
        captcha,
        isCountDown,
        isInvalidPhone,
        isLoading
    } = props;

    // dispatch
    const {
        keepCaptchaDefault,
        updateCaptcha,
        cancelLoading,
        loading,
        countDown,
        countDownEnd,
        notBeEmptyCaptcha,
        beEmptyCaptcha
    } = props;


    // 让当前控件 onChange 的时候与 Form.Item 产生交互
    const triggerChange = (changedValue: ICaptcha) => {

        onChange?.({ captcha, ...value, ...changedValue });
    };

    const defOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const captchaValue = e.target.value;
        keepCaptchaDefault();
        updateCaptcha(captchaValue);
        triggerChange({
            captcha: captchaValue
        });

        const isEmpty = captchaValue === '';
        if (isEmpty) beEmptyCaptcha();
        else notBeEmptyCaptcha();
    };


    let timer: any;
    const startCountDown = () => {
        countDown();
        let minite = 5;
        timer = setInterval(() => {

            if (minite <= 1) {
                countDownEnd();
                clearInterval(timer);
            }
            minite -= 1;
            setSeconds(minite);
        }, 1000);
    }


    const handleClick = () => {
        loading();
        setSeconds(5);
        setTimeout(() => {
            cancelLoading();
            startCountDown();
        }, 500);
    }

    

    return (
        <Input className='captcha-input'
            placeholder='验证码'
            onChange={defOnChange}
            suffix={
                <Button
                    type='link'
                    loading={isLoading}
                    disabled={isInvalidPhone || isLoading || isCountDown}
                    onClick={handleClick}
                >
                    {
                        isLoading ? '发送中' : 
                        isCountDown ? seconds + ' 秒后可重发' : '获取验证码'
                    }
                </Button>
            }
        />
    )
}

const mapStateToProps = (state: IRootState): IMapState => ({
    captcha: state.captchaInput.captcha,
    isInvalidPhone: state.phoneInput.isInvalid,
    isLoading: state.captchaInput.isLoading,
    isCountDown: state.captchaInput.isCountDown
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatch => ({
    updateCaptcha: (value: string) => void dispatch(onCaptchaChange(value)),
    beEmptyCaptcha: () => void dispatch(beEmptyCaptcha()),
    notBeEmptyCaptcha: () => void dispatch(notBeEmptyCaptcha()),
    loading: () => void dispatch(loading()),
    cancelLoading: () => void dispatch(cancelLoading()),
    countDown: () => void dispatch(countDown()),
    countDownEnd: () => void dispatch(countDownEnd()),
    keepCaptchaDefault: () => void dispatch(keepCaptchaDefault())
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaInput);