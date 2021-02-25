import { useState } from 'react'
import LoginFooter from '../LoginFooter'
import LoginMain from '../LoginMain'
import './index.scss'
const LoginWindow = () => {
    const [isPhoneLogin, setIsPhoneLogin] = useState(true)

    return (
        <div 
            className='login-window' 
            style={isPhoneLogin ? {minHeight: '514px', marginTop: '80px'} : {minHeight: '462px', marginTop: '100px'}}>
            <LoginMain isPhoneLogin={isPhoneLogin} setIsPhoneLogin={setIsPhoneLogin} />
            <LoginFooter />
        </div>
    )
}

export default LoginWindow