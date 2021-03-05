import React from 'react';
import LoginWindow from '../LoginWindow/loginWindow'
import Logo from '../../../../assets/imgs/logo_white.svg';
import './style.scss'

const WindowWarp: React.FC = () => {
    return (
        <div className='window-warp'>
            <img src={Logo} alt="leetcode" className='logo' />
            <div className='ipad'>
                <div className='screen'>
                    <div className="min-page">
                        <div className='left-part'>
                            <div className='app-draw'>
                                <div className="block">
                                    <div className="app blue"></div>
                                </div>
                                <div className="block">
                                    <div className='app green'></div>
                                </div>
                                <div className="block">
                                    <div className='app yellow'></div>
                                </div>
                                <div className="block">
                                    <div className='app red'></div>
                                </div>
                            </div>
                            <div className='some-list'>
                                <div className="list-obj">
                                    <div className="dot pull-right __web-inspector-hide-shortcut__"></div>
                                    <div className='item'></div>
                                </div>
                                <div className="list-obj">
                                    <div className="dot pull-right"></div>
                                    <div className='item'></div>
                                </div>
                                <div className="list-obj">
                                    <div className="dot pull-right"></div>
                                    <div className='item'></div>
                                </div>
                                <div className="list-obj">
                                    <div className="dot pull-right"></div>
                                    <div className='item'></div>
                                </div>
                                <div className="list-obj">
                                    <div className="dot pull-right"></div>
                                    <div className='item'></div>
                                </div>
                                <div className="list-obj">
                                    <div className="dot pull-right"></div>
                                    <div className='item'></div>
                                </div>
                            </div>
                        </div>
                        <div className='right-part'>
                            <div className="side-bar">
                                <div className='progress-panel'>
                                    <div className="draw-pie">
                                        <div className="pie" data-start="a" data-value="a"></div>
                                        <div className="pie big static" data-start="b" data-value="b"></div>
                                        <div className="pie big animate" data-start="b" data-value="b"></div>
                                    </div>
                                </div>
                                <div className='list-panel'>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <br />
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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