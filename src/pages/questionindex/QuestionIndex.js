import Header from './components/header/Header'
import Body from './components/body/Body'
import { Provider } from 'react-redux'
import { store } from './store'
import Footer from './components/footer/Footer'
const QuestionIndex = () => {
  return <div className='question-index'>
    <Provider store={store}>
      <Header />
      <Body />
      <Footer/>
    </Provider>
  </div>
}

export default QuestionIndex