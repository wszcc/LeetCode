import React, { createContext, useState } from "react"
import ResetPwdMain from '../ResetPwdMain/resetPwdMain'
import './style.scss'



const ResetPwdWindow: React.FC = () => {
    return (
        <div
            className='resetpwd-window'
        >
            <ResetPwdMain />
        </div>
    )
}

export default ResetPwdWindow