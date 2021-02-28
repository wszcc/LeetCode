import React from 'react'
import { Provider } from 'react-redux'
import { Layout } from 'antd';
import store from './store/index'
import Head from './components/Head'
import Side from './components/Side'
import Section from './components/Section'
import Headee from '../questionindex/components/header/Header'
import './Profile.scss'


const { Header, Sider, Content } = Layout;
const Profile = () => {


  return(
    <Provider store={store}>
      <Headee/>
      <Layout className="profile">
        <Header className="profile-Header">
          <Head/>
        </Header>
        <Layout className="profile2">
          <Sider className="profile-sider" width={238}>
            <Side/>
          </Sider>
          <Content className="profile-content">
            <Section/>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  )
}

export default Profile