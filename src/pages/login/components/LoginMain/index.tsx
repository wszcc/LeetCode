import React, { useRef, useState } from 'react';
import { Card, Button } from 'antd';
import {useHistory} from 'react-router-dom'
import PhoneLoginForm from './PhoneLoginForm'
import PwdLoginForm from './PwdLoginForm'
import { CaretRightOutlined} from '@ant-design/icons'

import './index.scss'


interface IProps {
    isPhoneLogin: boolean,
    setIsPhoneLogin: React.Dispatch<React.SetStateAction<boolean>>
}


const LoginMain: React.FC<IProps> = ({ isPhoneLogin, setIsPhoneLogin}) => {

    let history = useHistory();
    const handleClick = () => {
        
        if (!isPhoneLogin) {
            history.push('/resetpassword');
        }
    };

    return (
        <Card 
            className='login-window-main'
            title={isPhoneLogin ? '欢迎使用力扣' : '账号密码登录'}
            bordered={false}
        >

            <PhoneLoginForm style={{display: isPhoneLogin ? 'block' : 'none'}} />
            <PwdLoginForm style={{display: isPhoneLogin ? 'none' : 'block'}} />
            


            <div className='link-button-warp'>
                <Button className='link-button' type='link' onClick={() => setIsPhoneLogin(!isPhoneLogin)}>
                    {isPhoneLogin ? '账号密码登录' : '验证码登录'}
                </Button>


                <Button className='link-button' type='link' onClick={handleClick}>
                    {isPhoneLogin ? '邮箱注册' : '忘记密码'}
                </Button>
            </div>

            <div className='us-username' style={{display: isPhoneLogin ? 'flex' : 'none'}}>
                <span>已有美国站账号</span><CaretRightOutlined style={{fontSize: '12px', marginLeft: '2px'}}/>
            </div>
        </Card>
    )
}

export default LoginMain;