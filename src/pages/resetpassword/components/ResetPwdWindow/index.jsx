import { useState } from "react"
import ResetPwdMain from '../ResetPwdMain'
import './index.scss'
const ResetPwdWindow = () => {
    const [isByPhoneNumber, setIsByPhoneNumber] = useState(true)
    return (
        <div
            className='resetpwd-window'
        >
            <ResetPwdMain isByPhoneNumber={isByPhoneNumber} setIsByPhoneNumber={setIsByPhoneNumber} />
        </div>
    )
}

export default ResetPwdWindow