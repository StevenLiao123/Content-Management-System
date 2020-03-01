import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import BarChart from '../charts/barChart';
import LineChart from '../charts/lineChart';
import PieChart from '../charts/pieChart';

import './Admin.less';

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
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/barChart' component={BarChart} />
                            <Route path='/lineChart' component={LineChart} />
                            <Route path='/pieChart' component={PieChart} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{color: 'grey', textAlign: 'center'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;