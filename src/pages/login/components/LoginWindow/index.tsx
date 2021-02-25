import React, { useState } from 'react'
import LoginFooter from '../LoginFooter'
import LoginMain from '../LoginMain'
import './index.scss'
const LoginWindow: React.FC = () => {
    const [isPhoneLogin, setIsPhoneLogin] = useState(true)

    return (
        <div 
            className='login-window' 
            style={isPhoneLogin ? {minHeight: '514px', top: '50%'} : {minHeight: '462px', top: '54%'}}>
            <LoginMain isPhoneLogin={isPhoneLogin} setIsPhoneLogin={setIsPhoneLogin} />
            <LoginFooter />
        </div>
    )
}

export default LoginWindow