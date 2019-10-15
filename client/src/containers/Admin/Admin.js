import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

const { Footer, Sider, Content } = Layout;

// asdasdas
class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // if memory doesn't have user just redirect to login page.
        if (!user[0] || !user[0]._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header> Header </Header>
                    <Content style={{background: '#fff'}}>Content</Content>
                    <Footer style={{color: 'grey', textAlign: 'center'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;