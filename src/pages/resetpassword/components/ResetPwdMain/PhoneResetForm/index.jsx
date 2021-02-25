// import { Form, Button, Input } from 'antd';
// import React, { useRef, useState } from 'react';
// import { InvalidPhoneNumber, EmptyPhoneNumber, EmptyCaptcha } from '../../../../login/components/LoginMain/ErrorInfo'
// import CaptchaInput from '../../../../login/components/LoginMain/PhoneLoginForm/CaptchaInput'
// import './index.scss'


// const PhoneResetForm = () => {
//     const [form] = Form.useForm()
//     const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);
//     const [isEmptyPhoneNumber, setIsEmptyPhoneNumber] = useState(false);
//     const [isEmptyCaptcha, setIsEmptyCaptcha] = useState(false);
//     const phoneInputRef = useRef()

//     let phoneNumber = '';




//     // 每次 PhoneInput 改变的时候回调该方法用于检测手机号格式
//     const checkPhone = (_, value) => {

//         const reg = /^1[3-9][0-9]{9}$/g;
//         phoneNumber = value.phoneNumber;

//         setIsInvalidPhoneNumber(!reg.test(phoneNumber));


//         return Promise.resolve();
//     }




//     const onPhoneNumberChange = (e) => {

//     };


//     // 将表单填入的信息提交
//     const onFinish = (values) => {
//         console.log('表单提交的values:', values);
//     }

//     return (
//         <Form
//             className='phone-reset-form'
//             name='phone_reset_form'
//             form={form}
//             onFinish={onFinish}
//             initialValues={{
//                 phone: {
//                     phoneNumber: ''
//                 },
//                 captcha: {

//                 }
//             }}
//         >
//             <Form.Item
//                 className='phone-reset-form-item phone-input-item'
//                 name='phone'

//                 rules={[
//                     {
//                         validator: checkPhone
//                     }
//                 ]}
//                 help={
//                     isEmptyPhoneNumber ? <EmptyPhoneNumber /> :
//                         isInvalidPhoneNumber ? <InvalidPhoneNumber /> :
//                             <></>
//                 }
//             >
//                 <Input 
//                     className='phone-input'
//                     placeholder="输入手机号"
//                     ref={phoneInputRef}
//                     onChange={onPhoneNumberChange}
//                     type='tel'    
//                 />
//             </Form.Item>


//             <Form.Item
//                 className='phone-login-form-item captcha-input-item'
//                 name="captcha"
//                 help={
//                     isEmptyCaptcha ? <EmptyCaptcha /> :
//                         <></>
//                 }
//             >
//                 <CaptchaInput />
//             </Form.Item>

//             <Form.Item
//                 className='phone-login-form-item primary-button-item'
//             >
//                 <Button className='primary-button' type='primary' htmlType='submit' style={{ width: '100%' }}>重设我的密码</Button>
//             </Form.Item>


//         </Form>
//     )
// }

// export default PhoneResetForm