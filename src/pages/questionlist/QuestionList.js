
import '../questionlist/QuestionList.css'
import { Provider} from 'react-redux'
import store from './store/index'
import Index from './index'



const QuestionList = (props) =>{

    return <Provider store={store}>
    <div>
       <Index/>
        
    </div>
    </Provider>
}

export default QuestionList