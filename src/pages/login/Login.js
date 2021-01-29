import React, {useState} from 'react'
import {
    Form,
    Input,
    Button,
    Card,
    Select
} from 'antd'
import {
    QqOutlined,
    GithubOutlined,
    WeiboOutlined,
    WechatOutlined,
    EllipsisOutlined,
    CaretRightOutlined
} from '@ant-design/icons'
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
    const { Option } = Select;
    const [isPhoneLogin, setisPhoneLogin] = useState(true)

    const changeLoginWay = () => {
        setisPhoneLogin(!isPhoneLogin)
    }

    return (
        <div className='login' 
             style={isPhoneLogin ? {height: '514px', margin: '80px auto 0 auto'} : {height: '462px', margin: '100px auto 0 auto'}}
        >
            <Card className='login-card'
                title={isPhoneLogin ? '欢迎使用力扣' : '账号密码登录'}
                bordered={false}
            >
                <Form className='login-card-form' form={form}>
                    <Form.Item name='username'>

                        <Input.Group compact style={{display: `${isPhoneLogin ? 'block' : 'none'}`}}>
                            <Select style={{ width: '23%' }}defaultValue="Zhejiang">
                                <Option value="Zhejiang">+86</Option>
                                <Option value="Jiangsu">+852</Option>
                            </Select>
                            <Input style={{ width: '77%' }} placeholder='输入手机号' />
                        </Input.Group>

                        <Input placeholder='手机号/邮箱'style={{display: `${!isPhoneLogin ? 'block' : 'none'}`}}/>

                    </Form.Item>
                    <Form.Item name='passward'>
                        <Input placeholder={isPhoneLogin ? '验证码' : '输入密码'}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary'>{isPhoneLogin ? '登录 / 注册' : '登录'}</Button>
                        <div className='link-warp'>
                            <Button type='link' onClick={changeLoginWay}>
                                {isPhoneLogin ? '账号密码登录' : '验证码登录'}
                            </Button>
                            <Button type='link'>{isPhoneLogin ? '邮箱注册' : '忘记密码'}</Button>
                        </div>
                        <div className='us-user-login' 
                             style={{display: `${isPhoneLogin ? 'block' : 'none'}`}}
                        >已有美国站账号&nbsp;{<CaretRightOutlined />}</div>
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