import Header from './components/header/Header'
import Body from './components/body/Body'
import { Provider } from 'react-redux'
import { store } from './store'
const QuestionIndex = (props) => {
  return <div className='question-index'>
    <Provider store={store}>
      <Header />
      <Body />
    </Provider>
  </div>
}

export default QuestionIndex