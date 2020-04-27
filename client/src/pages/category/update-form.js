import React, { Component } from 'react';
import { Form, Input } from 'antd';
import Proptypes from 'prop-types';


// the form for updating a category
class UpdateForm extends Component {
    static propTypes = {
        name: Proptypes.string.isRequired,
        setForm: Proptypes.func.isRequired
    };

    UNSAFE_componentWillMount() {
        // pass the form to the parent component by invoking the setForm()
        this.props.setForm(this.props.form);
    }

    render() {
        const { name } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                               {
                                   required: true,
                                   message: "You should type in the name first!"
                                } 
                            ],
                        })(
                            <Input placeholder={'Please input a name of category'} />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);