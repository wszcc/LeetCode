import React from "react";
import Logo from "../../../../assets/imgs/logo.svg";
import "./header.scss";
import { Menu, Dropdown } from "antd";
import {Link} from 'react-router-dom'
import {
  RightSquareOutlined,
  BellOutlined,
  UserOutlined,
  DownOutlined
} from "@ant-design/icons";

function Header(props) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          题目以中文显示
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          题目以英文显示
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header">
      <ul className="header-nav">
        <li>
          <img src={Logo} alt="力扣"></img>
        </li>
        <li>学习</li>
        <li>题库</li>
        <li>讨论</li>
        <li>竞赛</li>
        <li>求职</li>
        <li className="shop">商店</li>
        <li>
          <a className="download" href="#">
            下载 App
          </a>
        </li>
        <li>
          <a className="member" href="#">
            Plus 会员
          </a>
        </li>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            中 <DownOutlined />
          </a>
        </Dropdown>
        <li>
          <RightSquareOutlined />
        </li>
        <li>
          <BellOutlined />
        </li>
        <li>
          <Link to='/profile'><UserOutlined /></Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
