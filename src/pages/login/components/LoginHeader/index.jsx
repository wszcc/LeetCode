import {useSelector} from 'react-redux'

const Header = () => {
    const {isPhoneLogin} = useSelector(allStates => ({
        isPhoneLogin: allStates.loginHeader.isPhoneLogin
    }))

    return (
        <>
            {isPhoneLogin ? '欢迎使用力扣' : '账号密码登录'}
        </>
    )
}

export default Header