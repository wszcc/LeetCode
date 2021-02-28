import React from 'react'
import './index.scss'
import headurl from './images/head.png'


const Head = () => {



    return (
        <div>
            <div className="pro-name">
                <img src={headurl} alt=""/>
                <div className="pro-introduce">
                    <span className="pro-xing">Pseudo-lover</span>
                    <div className="gexing">pseudo-lover-e</div>
                    <div className="pro-placing">
                        <span className="pro-ranking">全站排名</span>
                        <span className="pro-number">100.000</span>
                    </div>
                </div>
            </div>
            <div className="pro-edit">
                Helloword
            </div>
        </div>
    )
}

export default Head