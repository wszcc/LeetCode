import { useSelector, useDispatch } from 'react-redux'
import {
    Form,
    Input,
    Button, 
    Select
} from 'antd'

import { TO_PHONE_LOGIN, TO_PWD_LOGIN } from '../../store/constant';

const LoginMain = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch;
    const { Option } = Select;


    const { isPhoneLogin } = useSelector(allStates => ({
        isPhoneLogin: allStates.loginHeader.isPhoneLogin
    }))

    const changeLoginWay = () => {
        console.log('changeway');
        dispatch({ type: TO_PWD_LOGIN, isPhoneLogin: false })
    }

    return (
        <>
            <Form className='login-card-form' form={form}>
                {/* phone or username*/}
                <Form.Item className='login-card-form-item'>
                    {/* phone */}
                    <Input.Group compact style={{ display: `${isPhoneLogin ? 'block' : 'none'}` }}>
                        <Select style={{ width: '23%' }} defaultValue="Zhejiang">
                            <Option value="Zhejiang">+86</Option>
                            <Option value="Jiangsu">+852</Option>
                        </Select>
                        <Input className='login-card-form-input sp' style={{ width: '77%' }} placeholder='输入手机号' />
                    </Input.Group>


                    {/* username */}
                    <Input className='login-card-form-input' placeholder='手机号/邮箱' style={{ display: `${!isPhoneLogin ? 'block' : 'none'}` }} />
                </Form.Item>

                {/* verification or password */}
                <Form.Item className='login-card-form-item'>
                    <Input className='login-card-form-input' placeholder={isPhoneLogin ? '验证码' : '输入密码'} />
                </Form.Item>

                {/* login/register or login */}
                <Form.Item className='login-card-form-item'>
                    <Button type='primary'>{isPhoneLogin ? '登录 / 注册' : '登录'}</Button>
                </Form.Item>

                {/* link button */}
                <Form.Item className='login-card-form-item'>
                    <Button type='link' onClick={changeLoginWay}>
                        {isPhoneLogin ? '账号密码登录' : '验证码登录'}
                    </Button>
                    <Button type='link'>{isPhoneLogin ? '邮箱注册' : '忘记密码'}</Button>
                </Form.Item>
            </Form>        
        </>
    )
}

export default LoginMain