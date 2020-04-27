import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

// the form for adding a role
class AddForm extends Component {
  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 }, // set up the width of the left side of the label
      wrapperCol: { span: 15 } // set up the width of the input
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item label="Role's name">
          {getFieldDecorator("roleName", {
            initialValue: "",
            rules: [
              {
                required: true,
                message: "You should type in the name!"
              }
            ]
          })(<Input placeholder="Please input a name of role" />)}
        </Form.Item>
      </Form>
    );
  }
}

AddForm.propTypes = {
  setForm: PropTypes.func.isRequired // the function for transfering the objects of form
};

export default Form.create()(AddForm);
