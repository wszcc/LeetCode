import { Card, Radio } from 'antd'
import { useState } from 'react';
import PhoneResetForm from './PhoneResetForm'

import './index.scss'
const ResetPwdMain = (props) => {

    const {isByPhoneNumber, setIsByPhoneNumber} = props;
    console.log(isByPhoneNumber);

    return (
        <Card
            className='resetpwd-window-main'
            title='重新设置密码'
            bordered={false}
        >
            <div className='resetpwd-window-main-hint-warp'>
                <p className='resetpwd-window-main-hint'>
                    {isByPhoneNumber ? '忘记密码了？请输入您的11位手机号，我们会发送短信验证码到您手机。' : 
                                       '忘记密码了？请输入您的电子邮箱，我们会发送重设邮件到您的邮箱。'}
                </p>
            </div>

            <Radio.Group 
                value={isByPhoneNumber} 
                onChange={e => setIsByPhoneNumber(e.target.value)}
            >
                <Radio value={true}>用手机号重设</Radio>
                <Radio value={false}>用邮箱重设</Radio>
            </Radio.Group>

            <PhoneResetForm />


        </Card>
    )
}

export default ResetPwdMain