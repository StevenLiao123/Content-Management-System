import React, { Component } from 'react';
import { Form, Input } from 'antd';
import Proptypes from 'prop-types';


// the form for updating a category
class UpdateForm extends Component {
    static propTypes = {
        categoryName: Proptypes.string.isRequired,
        setForm: Proptypes.func.isRequired
    };

    componentWillMount() {
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
                            initialValue: name
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