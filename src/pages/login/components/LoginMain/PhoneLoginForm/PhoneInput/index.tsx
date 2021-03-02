import { Input, Select,  } from 'antd'
import { useCallback, useState } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { DownOutlined } from '@ant-design/icons';

import {
    beInvalidNumber,
    notBeInvalidNumber,
    beEmptyNumber,
    notBeEmptyNumber,
    notBeOnBlur,
    onPhoneChange,
    onSelectChange,
    keepPhoneDefault,
    breakPhoneDefault
}  from '../../../../store/actions/phoneInput'

import { IRootState } from '../../../../store/reducers';

import './index.scss'

const { Option } = Select;



interface IMapState {
    phone: string | undefined;
    select: string | undefined;
}

interface IMapDispatch {
    beInvalidNumber: () => void;
    notBeInvalidNumber: () => void;
    beEmptyNumber: () => void;
    notBeEmptyNumber: () => void;
    notBeOnBlur: () => void;
    updatePhone: (value: string) => void;
    updateSelect: (value: string) => void;
    breakPhoneDefault: () => void;
    keepPhoneDefault: () => void;
}

export interface IPhoneNumber {
    select: string | undefined;
    phone: string | undefined;
}

interface BaseProps extends IMapState, IMapDispatch {
    children?: React.ReactNode;
    value?: IPhoneNumber;
    onChange?: (value: IPhoneNumber) => void;
}


const PhoneInput: React.FC<BaseProps> = (props) => {

    const {onChange, value} = props;
    
    const [isSelectMouseEnter, setIsSelectMouseEnter] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    // state
    const {
        phone,
        select
    } = props;

    // dispatch
    const {
        beInvalidNumber,
        notBeInvalidNumber,
        beEmptyNumber,
        notBeEmptyNumber,
        notBeOnBlur,
        updatePhone,
        updateSelect,
        breakPhoneDefault,
        keepPhoneDefault
    } = props;

    // 让当前控件 onChange 的时候与 Form.Item 产生交互
    const triggerChange = (changedValue: IPhoneNumber) => {
        onChange?.({ phone, select, ...value, ...changedValue });
    };

    const defOnChange = (e: any) => {
        keepPhoneDefault();
        // 如果是 Select 改变
        if (typeof e === 'string') {
            const selectValue = e;
            updateSelect(selectValue);
            triggerChange({
                phone,
                select: selectValue
            });
        } else {
            // 如果是 Input 改变
            const phoneNumber = e.target.value;

            // 更新 value
            updatePhone(phoneNumber);

            // isInvalid
            const isInvalid = !(/^1[3-9][0-9]{9}$/g.test(phoneNumber)/* ||phoneNumber === '' */);
            if (isInvalid) beInvalidNumber();
            else notBeInvalidNumber();

            // isEmpty
            const isEmpty = phoneNumber === '';
            if (isEmpty) beEmptyNumber();
            else notBeEmptyNumber();
            triggerChange({
                phone: phoneNumber,
                select
            });
        }
    };


 
    return (
        <>
            <Input
                className='phone-input'
                placeholder="输入手机号"
                type='tel'
                onChange={defOnChange}

                onFocus={() => notBeOnBlur()}
                onBlur={() => breakPhoneDefault()}
                

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

const mapStateToProps = (state: IRootState): IMapState => ({
    phone: state.phoneInput.phone,
    select: state.phoneInput.select
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatch => ({
    beInvalidNumber: () => void dispatch(beInvalidNumber()),
    notBeInvalidNumber: () => void dispatch(notBeInvalidNumber()),
    beEmptyNumber: () => void dispatch(beEmptyNumber()),
    notBeEmptyNumber: () => void dispatch(notBeEmptyNumber()),
    notBeOnBlur: () => void dispatch(notBeOnBlur()),
    updatePhone: (value: string) => void dispatch(onPhoneChange(value)),
    updateSelect: (value: string) => void dispatch(onSelectChange(value)),
    keepPhoneDefault: () => void keepPhoneDefault(),
    breakPhoneDefault: () => void breakPhoneDefault()    
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);