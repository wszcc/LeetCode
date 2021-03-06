import React, { CSSProperties, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import LoginFooter from '../LoginFooter/loginFooter'
import LoginMain from '../LoginMain/loginMain'
import { FormTypes } from '../../store/reducers/loginMain';
import { IRootState } from '../../store/reducers';
import './style.scss';


interface IMapState {
    formType: FormTypes
}

interface IBaseProps extends IMapState {
    children?: React.ReactNode
    style?: CSSProperties
}


const LoginWindow: React.FC<IBaseProps> = (props) => {

    const {formType} = props;

    const phoneLoginStyle: CSSProperties = {
        minHeight: '514px',
        top: '50%'
    };

    const pwdLoginStyle: CSSProperties = {
        minHeight: '462px', 
        top: '54%'
    };

    const usaLoginStyle: CSSProperties = {
        minHeight: '384px',
        top: '60%'
    }

    const emailRegisterStyle: CSSProperties = {
        minHeight: '514px',
        top: '50%'
    }

    const [windowStyle, setWindowStyle] = useState(phoneLoginStyle);

    const getLoginWindowStyle = (): CSSProperties => {
        switch(formType) {
            case FormTypes.EmailRegisterForm:
                return emailRegisterStyle;

            case FormTypes.PhoneLoginForm:
                return phoneLoginStyle;

            case FormTypes.USALoginForm:
                return usaLoginStyle;

            case FormTypes.PwdLoginForm: 
                return pwdLoginStyle;
            default:
                return phoneLoginStyle;
        }
    }

    useEffect(() => {
        setWindowStyle(getLoginWindowStyle());
    }, [formType]);
    
    return (
        <div 
            className='login-window' 
            style={windowStyle}>
            <LoginMain />
            {/* 只要是 USALoginForm 则把 Footer 隐藏起来 */}
            <LoginFooter style={{
                display: formType === FormTypes.USALoginForm ? 'none' : 'block'
            }}/>
        </div>
    )
}

const mapStateToProps = (state: IRootState): IMapState => ({
    formType: state.loginMain.form
});

export default connect(mapStateToProps, {})(LoginWindow);