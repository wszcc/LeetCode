import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { QqOutlined, GithubOutlined, WeiboOutlined, WechatOutlined, EllipsisOutlined } from '@ant-design/icons'
/* 
<QqOutlined />
<WechatOutlined />
<GithubOutlined />
<WeiboOutlined />
<LinkedinOutlined />
*/
import './login.scss'
const Login = (props) =>{
    const [form] = Form.useForm()

    const changeLoginWay = () => {

    }

    return (
        <div className='login'>
            <Card className='login-card'
                title='账户密码登录'
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
                        <Button type='primary'>登录</Button>
                        <div className='link-warp'>
                            <Button type='link' onClick={changeLoginWay}>验证码登录</Button>
                            <Button type='link'>忘记密码</Button>
                        </div>

                    </Form.Item>
                </Form>
                <div className='login-card-ways'>
                    <div className='login-card-ways-item'>
                        <div className='icon-warp'>
                            <QqOutlined className='icon qq'/>
                        </div>
                    </div>
                    <div className='login-card-ways-item'>
                        <div className='icon-warp'>
                            <GithubOutlined className='icon github'/>
                        </div>                        
                    </div>
                    <div className='login-card-ways-item'>
                        <div className='icon-warp'>
                            <WeiboOutlined className='icon sina'/>
                        </div>
                    </div>
                    <div className='login-card-ways-item'>
                        <div className='icon-warp'>
                            <WechatOutlined className='icon wechat'/>
                        </div>
                    </div>
                    <div className='login-card-ways-item'>
                        <div className='icon-warp'>
                            <EllipsisOutlined className='icon other'/>
                        </div>
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