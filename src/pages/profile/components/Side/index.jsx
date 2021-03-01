import React from 'react'
import { Statistic, Divider, Typography } from 'antd'
import './index.scss'
import urlDiamond from './images/diamond.png'
import urlEye from './images/eye.png'
import urlThumbsup from './images/thumbs_up.png'
import urlCollection from './images/collection.png'
import urlGender from './images/gender.png'
import urlPlace from './images/place.png'


const {Title} = Typography

const Side = () => {


    return (
        <div>
            <div className="pro-follow">
                <div className="pro-follow-left">
                    <Statistic title="关注了" value={123456} />
                </div>
                <Divider type="vertical" className="pro-divider"/>
                <div className="pro-follow-right">
                    <Statistic title="关注者" value={24263} />
                </div>
            </div>
            <div className="pro-data">编辑个人资料</div>
            <div className="pro-achie">
                <Title level={5}>成就贡献</Title>
                <div className="pro-proce">
                    <Statistic title={<span><img src={urlDiamond} alt=""/>  声望等级</span>} value={'暂无'}/>
                    <Statistic title={<span><img src={urlEye} alt=""/>  阅读总数</span>} value={0} />
                    <Statistic title={<span><img src={urlThumbsup} alt=""/>  获得点赞</span>} value={0} />
                    <Statistic title={<span><img src={urlCollection} alt=""/>  获得收藏</span>} value={0} />
                </div>
            </div>
            <div className="pro-profile">
                <Title level={5}>个人简介</Title>
                <div className="pro-profile-detail">
                    <div className="pro-picture"><img src={urlPlace} alt=""/>  重庆</div>
                    <div className="pro-picture"><img src={urlGender} alt=""/>  男</div>
                </div>
            </div>
            <div className="pro-skills">
                <Title level={5}>擅长技能</Title>
            </div>
        </div>
    )
}

export default Side