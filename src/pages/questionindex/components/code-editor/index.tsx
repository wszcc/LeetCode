import { memo } from "react";
import { Provider } from 'react-redux'
import Editor from "./components/Editor";
import ConfigBar from "./components/ConfigBar";
import { store } from './store'
import './style.scss'
import { fromEvent } from "rxjs";
import { map, switchMap } from 'rxjs/operators'
import { delay } from "../../../../utils/shared";

fromEvent(document, 'click').pipe(
  switchMap(() => delay("hello", 1000))
).subscribe(console.log)





const CodeEditor = () => {
  return (
    <Provider store={store}>
      <ConfigBar />
      <Editor />
    </Provider>
  )
}

export default memo(CodeEditor)