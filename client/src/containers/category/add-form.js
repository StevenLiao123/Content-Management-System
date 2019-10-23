import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';


const Option = Select.Option;

// the form for adding a category
class AddForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;


        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0'
                        })(
                            <Select>
                                <Option value='0'>1</Option>
                                <Option value='1'>2</Option>
                                <Option value='2'>3</Option>
                                <Option value='3'>4</Option>
                            </Select>
                        )
                    }
                </Form.Item>

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

export default Form.create()(AddForm);