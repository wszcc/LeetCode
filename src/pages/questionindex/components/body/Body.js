import {  useState } from 'react'
import './body.scss'
import Right from './right/Right'
import Left from './left/Left'
import MidDragBar from './mid'
const Body = () => {
  const [width, setWidth] = useState(0)
  return <div className='body'>
    <Left width={width}/>
    <MidDragBar setWidth={setWidth}/>
    <Right />
  </div>
}

export default Body