import { Input, Button } from 'antd';
import { useState } from 'react';
import { useCaptcha } from '../../../../../../utils/hooks';
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
    const [number, setNumber] = useState('');

    // props
    const {
        className,
        value = {},
        onChange,
        setOnBlur,
        isPhoneValid
    } = props;


    const [getCaptcha, btnStatus] = useCaptcha('phone', '#', 60, [isPhoneValid]);



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
                    {...btnStatus.btnProps}
                    onClick={getCaptcha}
                >
                    {btnStatus.children}
                </Button>
            }
        />
    )
}



export default CaptchaInput;