import React, { Component } from 'react';
import { Form, Input } from 'antd';


// the form for updating a category
class UpdateForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;


        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: ''
                        })(
                            <Input placeholder='Please input a name of category' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);