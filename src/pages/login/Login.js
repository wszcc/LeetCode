import { Provider, useSelector } from 'react-redux'
import store from './store/index'
import { Card } from 'antd'

import Header from './components/LoginHeader'
import LoginMain from './components/LoginMain'
import Footer from './components/LoginFooter'

import './login.scss'


const Login = (props) =>{
    // const { isPhoneLogin } = useSelector(allStates => ({
    //     isPhoneLogin: allStates.loginHeader.isPhoneLogin
    // }))
    // return (
    //     <Provider store={store}>
    //         <div className='login' 
    //             // style={isPhoneLogin ? {height: '514px', margin: '80px auto 0 auto'} : {height: '462px', margin: '100px auto 0 auto'}}
    //         >
    //             <Card className='login-card'
    //                 title={<Header />}
    //                 bordered={false}
    //             >
    //                 <LoginMain />
    //                 {/* assets */}
    //                 <Footer />
    //             </Card>
    //         </div>
    //     </Provider>
    // ) 
    return (
        <>
        </>
    )
}

export default Login