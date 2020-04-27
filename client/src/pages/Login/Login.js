import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import LinkButton from '../../components/link-button';

import { connect } from 'react-redux';
import { login } from '../../redux/actions';

import './login.less';
import logo from '../../assets/images/logo.jpeg';

class Login extends Component {

    handleSubmit = e => {
        // the default action that belongs to the event will be cancelled !! 
        e.preventDefault();
        // validate the value from input
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password } = values;
                this.props.login(username, password);   
            } else {
                console.log('Submit is failed!');
            }
        });
    };

    // custom validation for password
    validatePassword = (rule, value, callback) => {
        if (!value) {
            callback('Please input your password!');
        } else if (value.length < 4) {
            callback('Please input at least 4 characters!');
        } else if (value.length > 12) {
            callback('Please do not input more than 12 characters!');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('Please includes english and numbers!');
        } else {
            callback();
        }
    }

    toSignup = () => {
        this.props.history.push('/signup');
    }

    render() {
        // jump into the managment page if the user has already been signed in 
        const user = this.props.user || {};
        if(user && user._id) {
            return <Redirect to='/home' />;
        }
        // get form object 
        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>Content Management System</h1>
                </header>
                <section className="login-content">
                    <h2>Login</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /* 
                                    setup the input for collecting data and validating the values
                                */
                            }
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please input your username!'
                                    },
                                    {
                                        min: 4,
                                        message: 'Please input at least 4 characters!'
                                    },
                                    {
                                        max: 12,
                                        message: 'Please do not input more than 12 characters!'
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]+$/,
                                        message: 'Please includes english and numbers!'
                                    },
                                ],
                            })(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validatePassword
                                    }],
                            })(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <LinkButton onClick={this.toSignup}>register now!</LinkButton>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

//Form.create()() is a higher order function(HOF) and WrappedLogin is a higher order component(HOC)
const WrappedLogin = Form.create()(Login);
export default connect(
    state => ({user: state.user}),
    { login }
)(withRouter(WrappedLogin));
