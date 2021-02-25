import React from 'react';
import LoginWindow from '../LoginWindow/index'
import Logo from '../../../../assets/imgs/logo_white.svg';
import './index.scss'

const WindowWarp: React.FC = () => {
    return (
        <div className='window-warp'>
            <img src={Logo} alt="leetcode" className='logo'/>
            <div className='background'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span>LeetCode</span>
            </div>
            <LoginWindow />
        </div>
    )
}

export default WindowWarp;