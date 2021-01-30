import React from 'react'
import './body.scss'
import Right from './right/Right'
import Left from './left/Left'
const Body = () =>{
    return <div className='body'>
        <Left/>
        <Right/>
    </div>
}

export default Body