import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
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
import NotFound from '../not-found/not-found';

import './Admin.less';

const { Footer, Sider, Content } = Layout;

// asdasdas
class Admin extends Component {
    render() {
        const user = this.props.user;
        // if memory doesn't have user just redirect to login page.
        if (!user || !user.username) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header> Header </Header>
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/barChart' component={BarChart} />
                            <Route path='/lineChart' component={LineChart} />
                            <Route path='/pieChart' component={PieChart} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{color: 'grey', textAlign: 'center'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin);