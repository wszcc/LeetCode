import { Provider } from 'react-redux'
import store from './store/index'
import WindowWarp from './components/WindowWarp/windowWarp'


const Login = (props) =>{
    return (
        <Provider store={store}>
            <WindowWarp />
        </Provider>
    )
}

export default Login