import React, { Component } from 'react';
import LinkButton from '../../components/link-button';
import { Form, Icon, Input, Button, message } from 'antd';
import { reqSignup } from '../../api';

import './SignUp.less';
import logo from '../../assets/images/logo.jpeg';

class SignUp extends Component {

    handleSubmit = e => {
        // the default action that belongs to the event will be cancelled !! 
        e.preventDefault();
        // validate the value from input
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password, email } = values;
                const response = await reqSignup(username, password, email);
                message.success('Sign up successful!', response);
                this.props.history.replace('/login');              
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

    toLogin = () => {
        this.props.history.push('/login');
    }

    render() {
        // get form object 
        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="signup">
                <header className="signup-header">
                    <img src={logo} alt="logo" />
                    <h1>Content Management System</h1>
                </header>
                <section className="signup-content">
                    <h2>Sign Up</h2>
                    <Form onSubmit={this.handleSubmit} className="signup-form">
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
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.confirmPassword
                                    }],
                            })(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="confirmPassword"
                                placeholder="Confirm Password"
                            />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please input your email!'
                                    },
                                    {
                                        min: 4,
                                        message: 'Please input at least 4 characters!'
                                    },
                                    {
                                        max: 100,
                                        message: 'Please do not input more than 100 characters!'
                                    },
                                ],
                            })(<Input
                                prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="Email"
                            />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="signup-form-button">
                                Sign up
                            </Button>
                            Or <LinkButton onClick={this.toLogin}>back to login!</LinkButton>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

//Form.create()() is a higher order function(HOF) and WrappedLogin is a higher order component(HOC)
const WrappedSignup = Form.create()(SignUp);
export default WrappedSignup;
