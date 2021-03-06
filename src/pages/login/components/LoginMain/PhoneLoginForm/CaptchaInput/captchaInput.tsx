import { Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './style.scss'

export interface ICaptcha {
    number?: string | undefined;
}

interface BaseProps {
    className?: string;
    children?: React.ReactNode;
    style?: {};
    onChange?: (value: ICaptcha) => void;
    value?: ICaptcha;
    setOnBlur: React.Dispatch<React.SetStateAction<boolean>>
    isPhoneValid: boolean
}



const CaptchaInput: React.FC<BaseProps> = (props) => {

    // state
    const [number ,setNumber] = useState('');
    const initSeconds = 5;
    const [seconds, setSeconds] = useState(initSeconds);
    const [isLoading, setIsLoading] = useState(false);
    const didMountRef = useRef(false);
    
    // disabled 的情况：
    // 1. 默认情况下：true
    // 2. isPhoneValid 从 false 变为 ture：false
    // 3. isPhoneValid 从 ture 变为 false：true
    // 4. isCountDown 从 false 变为 true：true
    // 5. isCountDown 从 true 变为 false：false
    // 6. isLoading 从 false 变为 true：true
    // 7. isLoading 从 true 变为 false：true
    const [isDisabled, setIsDisabled] = useState(true);
    const [isCountDown, setIsCountDown] = useState(false);


    // props
    const { 
        className,
        value = {}, 
        onChange, 
        setOnBlur,
        isPhoneValid 
    } = props;

    useEffect(() => {
            setIsDisabled(!isPhoneValid);
    }, [isPhoneValid])

    // 让当前控件 onChange 的时候与 Form.Item 产生交互
    const triggerChange = (changedValue: ICaptcha) => {

        onChange?.({ number, ...value, ...changedValue });
    };

    const defOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const captchaValue = e.target.value;
        setNumber(captchaValue);
        triggerChange({
            number: captchaValue
        });


    };


    let timer: any;
    const startCountDown = () => {

        // 倒计时60秒
        // setSeconds(5);

        let countDownTime = initSeconds;
        // 每隔一秒，countDownTime 减 1
        timer = setInterval(() => {

            // countDownTime 为 0 时停止倒计时
            if (countDownTime <= 1) {
                console.log(1);

                setSeconds(initSeconds);

                setIsCountDown(false);
                setIsDisabled(false)
                clearInterval(timer);
                return;
            }
            countDownTime -= 1;
            setSeconds(countDownTime);
        }, 1000);
    }

    // 点击获取验证码
    const handleClick = () => {
        // 按钮 loading：正在发生请求
        setIsLoading(true);
        setIsDisabled(true)

        setTimeout(() => {
            // 按钮停止 loading：请求结束 
            setIsLoading(false);

            // 开始倒计时
            setIsCountDown(true);
            startCountDown();
        }, 500);
    }

    

    return (
        <Input 
            className={`${className} captcha-input`}
            placeholder='验证码'
            onBlur={() => setOnBlur(true)}
            onFocus={() => setOnBlur(false)}
            onChange={defOnChange}
            suffix={
                <Button
                    type='link'
                    loading={isLoading}
                    disabled={isDisabled}
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



export default CaptchaInput;