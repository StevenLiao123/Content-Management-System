import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';


const Option = Select.Option;

// the form for adding a category
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // the function for transfering the objects of form
        categories: PropTypes.array.isRequired, // the array of parent categories
        parentId: PropTypes.string.isRequired // the id of sub-categories
    };

    componentWillMount () {
        this.props.setForm(this.props.form);
    }

    render() {
        const { categories, parentId } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value='a'>Parent Category</Option>
                                {
                                    categories.map(category => <Option value={category._id}>{category.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: '',
                            rules: [{
                                required: true,
                                message: "You should type in the name first!"
                            }],
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