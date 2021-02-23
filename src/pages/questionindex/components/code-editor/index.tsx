import { memo } from "react";
import { Provider } from 'react-redux'
import Editor from "./components/Editor";
import ConfigBar from "./components/ConfigBar";
import { store } from './store'
import './style.scss'

const CodeEditor = () => {
  return (
    <Provider store={store}>
      <ConfigBar />
      <Editor />
    </Provider>
  )
}

export default memo(CodeEditor)