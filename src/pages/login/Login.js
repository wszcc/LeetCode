import { Provider } from 'react-redux'
import store from './store/index'
import LoginWindow from './components/LoginWindow'


const Login = (props) =>{
    return (
        <Provider store={store}>
            <LoginWindow />
        </Provider>
    )
}

export default Login