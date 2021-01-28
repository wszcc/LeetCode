import React from 'react'
import { Form, Input, Button, Card } from 'antd'

/* 
< QqOutlined / >
< WechatOutlined / >
< GithubOutlined / >
< WeiboOutlined / >
< LinkedinOutlined / >
*/
import './login.scss'
const Login = (props) =>{
    const [form] = Form.useForm()
    return (
        <div className='login'>
            <Card className='login-card'
                title='账户密码登陆'
                bordered={false}
            >
                <Form className='login-card-form' form={form}>
                    <Form.Item name='username'>
                        <Input placeholder='手机号/邮箱'/>
                    </Form.Item>
                    <Form.Item name='passward'>
                        <Input placeholder='输入密码'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary'>登陆</Button>
                        <div className='link-warp'>
                            <Button type='link'>验证码登陆</Button>
                            <Button type='link'>忘记密码</Button>
                        </div>

                    </Form.Item>
                </Form>
                <div className='login-card-ways'>
                    <div className='login-card-ways-item qq'>
                        <div className='icon-warp'></div>
                    </div>
                    <div className='login-card-ways-item github'>
                        <div className='icon-warp'></div>                        
                    </div>
                    <div className='login-card-ways-item sina'>
                        <div className='icon-warp'></div>
                    </div>
                    <div className='login-card-ways-item wechat'>
                        <div className='icon-warp'></div>
                    </div>
                    <div className='login-card-ways-item other'>
                        <div className='icon-warp'></div>
                    </div>
                </div>

                <div className='login-card-footer'>
                    <div className='login-card-footer-top'>登录注册即代表同意力扣&emsp;<span className='login-card-footer-top sp'>用户协议</span>&emsp;和&emsp;<span className='login-card-footer-top sp'>隐私协议</span></div>
                    <div className='login-card-footer-buttom'>
                        <div className='item'>关于我们</div>
                        <div className='item'>问题反馈</div>
                        <div className='item'>帮助中心</div>
                    </div>
                </div>
            </Card>
        </div>
    ) 
}

export default Login