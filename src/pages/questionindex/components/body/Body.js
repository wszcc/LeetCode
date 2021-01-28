import React from 'react'
import './body.scss'
import Left from './left/Left'
import Right from './right/Right'
const Body = () =>{
    return <div className='body'>
        <Left/>
        <Right/>
    </div>
}

export default Body