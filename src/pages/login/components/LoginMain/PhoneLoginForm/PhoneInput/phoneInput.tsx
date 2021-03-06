import { Input, Select,  } from 'antd'
import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import './style.scss'

const { Option } = Select;

export interface IPhoneNumber {
    select: string | undefined;
    number: string | undefined;
}

interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
    value?: IPhoneNumber;
    onChange?: (value: IPhoneNumber) => void;
    setOnBlur: React.Dispatch<React.SetStateAction<boolean>>;
}



const PhoneInput: React.FC<IBaseProps> = (props) => {

    // props
    const {
        onChange, 
        value, 
        setOnBlur,
        className
    } = props;
    

    // state
    const [isSelectMouseEnter, setIsSelectMouseEnter] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [number, setNumber] = useState('');
    const [select, setSelect] = useState('');
 

    // 让当前控件 onChange 的时候与 Form.Item 产生交互
    const triggerChange = (changedValue: IPhoneNumber) => {
        onChange?.({ number, select, ...value, ...changedValue });
    };

    const defOnChange = (e: any) => {

        // 如果是 Select 改变
        if (typeof e === 'string') {
            const selectValue = e;
            setSelect(selectValue);
            triggerChange({
                number,
                select: selectValue
            });
        } else {
            
            // 如果是 Input 改变
            const phoneNumber = e.target.value;

            // 更新 value
            setNumber(phoneNumber);


            triggerChange({
                number: phoneNumber,
                select
            });
        }
    };

 
    return (
        <>
            <Input
                className={`${className} phone-input`}
                placeholder="输入手机号"
                type='tel'
                onChange={defOnChange}

                onFocus={() => setOnBlur(false)}
                onBlur={() => setOnBlur(true)}
                
                prefix={
                    <Select 
                        bordered={false}
                        className='phone-input-select'
                        defaultValue='+86'
                        suffixIcon={<DownOutlined 
                                        rotate={isOpened ? 180 : 0} 
                                        onClick={() => setIsOpened(!isOpened)} 
                                        style={{ borderRight: '1px solid #D9D9D9', 
                                                paddingRight: '3px', fontSize: '10px', 
                                                color: isSelectMouseEnter ? '#2DB55D' : '#D9D9D9'}} 
                                    />}
                        onMouseEnter={() => setIsSelectMouseEnter(true)}
                        onMouseLeave={() => setIsSelectMouseEnter(false)}

                        // 处理下拉框是否展开
                        onClick={() => setIsOpened(!isOpened)}
                        onChange={defOnChange}
                        onFocus={() => {console.log(1);}}

                        open={isOpened}
                        // options={options}   用 options 属性替换 Option 组件性能更好

                        optionLabelProp='value'
                    
                        dropdownMatchSelectWidth={false}
                        
                        dropdownStyle={{width: '150px'}}
                    >
                        <Option key='1' value='+86'>中国(+86)</Option>
                        <Option key='2' value='+852'>中国香港(+852)</Option>
                        <Option key='3' value='+853'>中国香港(+853)</Option>
                        <Option key='4' value='+886'>中国台湾(+886)</Option>
                        <Option key='6' value='+1'>美国(+1)</Option>
                        <Option key='7' value='+33'>法国(+33)</Option>
                        <Option key='8' value='+44'>英国(+44)</Option>
                        <Option key='9' value='+49'>德国(+49)</Option>
                        <Option key='10' value='+60'>马来西亚(+60)</Option>
                        <Option key='11' value='+61'>澳大利亚(+61)</Option>
                        <Option key='12' value='+62'>印度尼西亚(+62)</Option>
                        <Option key='13' value='+64'>新西兰(+64)</Option>
                        <Option key='14' value='+65'>新加坡(+65)</Option>
                        <Option key='15' value='+66'>泰国(+66)</Option>
                        <Option key='16' value='+81'>日本(+81)</Option>
                        <Option key='17' value='+82'>韩国(+82)</Option>
                        <Option key='18' value='+91'>印度(+91)</Option>
                    </Select>
                }
            />
        </>
    )
}

export default PhoneInput;