import React, { CSSProperties, useState } from 'react'
import LoginFooter from '../LoginFooter/index'
import LoginMain from '../LoginMain'
import './index.scss'
const LoginWindow: React.FC = () => {
    const [isPhoneLogin, setIsPhoneLogin] = useState(true);
    const phoneLoginStyle: CSSProperties = {
        minHeight: '514px',
        top: '50%'
    };

    const pwdLoginStyle: CSSProperties = {
        minHeight: '462px', 
        top: '54%'
    };
    
    return (
        <div 
            className='login-window' 
            style={isPhoneLogin ? phoneLoginStyle : pwdLoginStyle}>
            <LoginMain isPhoneLogin={isPhoneLogin} setIsPhoneLogin={setIsPhoneLogin} />
            <LoginFooter />
        </div>
    )
}

export default LoginWindow