import {
    QqOutlined,
    GithubOutlined,
    WeiboOutlined,
    WechatOutlined,
    EllipsisOutlined
} from '@ant-design/icons'
import './index.scss'


const Footer = () => {
    return (
        <>
            <div className='login-card-ways'>
                <div className='login-card-ways-item'>
                    <div className='icon-warp'>
                        <QqOutlined className='icon qq' />
                    </div>
                </div>
                <div className='login-card-ways-item'>
                    <div className='icon-warp'>
                        <GithubOutlined className='icon github' />
                    </div>
                </div>
                <div className='login-card-ways-item'>
                    <div className='icon-warp'>
                        <WeiboOutlined className='icon sina' />
                    </div>
                </div>
                <div className='login-card-ways-item'>
                    <div className='icon-warp'>
                        <WechatOutlined className='icon wechat' />
                    </div>
                </div>
                <div className='login-card-ways-item'>
                    <div className='icon-warp'>
                        <EllipsisOutlined className='icon other' />
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
        </>
    )
}
export default Footer