import { Card, Radio } from 'antd'
import React, { useState } from 'react';
import ResetForm, {ResetFormTypes} from './ResetForm/resetForm'
import './style.scss'

const ResetPwdMain: React.FC = () => {

    const [isByPhone, setIsByPhone] = useState(true);

    return (
        <Card
            className='resetpwd-window-main'
            title='重新设置密码'
            bordered={false}
        >
            <div className='resetpwd-window-main-hint-warp'>
                <p className='resetpwd-window-main-hint'>
                    {isByPhone ? '忘记密码了？请输入您的11位手机号，我们会发送短信验证码到您手机。' : 
                                       '忘记密码了？请输入您的电子邮箱，我们会发送邮件验证码到您的邮箱。'}
                </p>
            </div>

            <Radio.Group 
                value={isByPhone} 
                onChange={e => setIsByPhone(e.target.value)}
            >
                <Radio value={true}>用手机号重设</Radio>
                <Radio value={false}>用邮箱重设</Radio>
            </Radio.Group>
 
            <ResetForm type={ResetFormTypes.ByPhoneReset} style={{display: `${isByPhone ? 'block' : 'none'}`}}/>
            <ResetForm type={ResetFormTypes.ByEmailReset} style={{display: `${isByPhone ? 'none' : 'block'}`}}/>
           
        </Card>
    )
}

export default ResetPwdMain;