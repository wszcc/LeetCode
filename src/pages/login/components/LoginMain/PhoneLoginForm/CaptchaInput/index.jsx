import { Input, Button } from 'antd';
import { useCallback, shallowEqual, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import './index.scss'



const CaptchaInput = ({ onChange, value = {} }) => {
    const dispacth = useDispatch();


    const captchaValue = useSelector(allStates => allStates.captchaInput.value, shallowEqual);
    const isInvalid = useSelector(allStates => allStates.phoneInput.isInvalid, shallowEqual);
    const isLoading = useSelector(allStates => allStates.captchaInput.isLoading, shallowEqual);
    const isCountDown = useSelector(allStates => allStates.captchaInput.isCountDown, shallowEqual);
    const [seconds, setSeconds] = useState(5);



    // 让当前控件 onChange 的时候与 Form.Item 产生交互
    const triggerChange = useCallback((changedValue) => {
        if (onChange) {
            onChange({
                captchaValue,
                ...value,
                ...changedValue
            });
        }
    }, [captchaValue, value, onChange]);

    const defOnChange = useCallback((e) => {
        const captchaValue = e.target.value;
        dispacth(keepCaptchaDefault());
        dispacth(onCaptchaChange(captchaValue));   
        triggerChange({
            captchaValue
        });

        const isEmpty = captchaValue === '';
        if (isEmpty) dispacth(beEmptyCaptcha());
        else dispacth(notBeEmptyCaptcha());
    }, [dispacth, triggerChange]);


    let timer;
    const startCountDown = () => {
        dispacth(countDown())
        let minite = 5;
        timer = setInterval(() => {

            if (minite <= 1) {
                dispacth(countDownEnd());
                clearInterval(timer);
            }
            minite -= 1;
            setSeconds(minite);
        }, 1000);
    }


    const handleClick = () => {
        dispacth(loading());
        setSeconds(5);
        setTimeout(() => {
            dispacth(cancelLoading());
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
                    disabled={isInvalid || isLoading || isCountDown}
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

export default CaptchaInput