import React from 'react'
import { Provider } from 'react-redux'

import ResetPwdWindow from './components/ResetPwdWindow'

const resetPassword = (props) =>{
    return <div className='login'>
        <ResetPwdWindow />
    </div>
}

export default resetPassword