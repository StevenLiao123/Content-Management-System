import React, { PureComponent } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

// the form for adding a user
class UserForm extends PureComponent {

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

  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles, selectedUser } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 }, // set up the width of the left side of the label
      wrapperCol: { span: 15 } // set up the width of the input
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item label="Name">
          {getFieldDecorator("username", {
            initialValue: selectedUser.username,
            rules: [
              {
                  whitespace: true,
                  message: 'Please input an username!'
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
          })(<Input placeholder="Please input an user name" />)}
        </Form.Item>

        {
          !selectedUser._id ? (
            <Form.Item label="Password">
            {getFieldDecorator("password", {
              initialValue: "",
              rules: [
                {
                    validator: this.validatePassword
                }],
            })(<Input type="password" placeholder="Please input a password" />)}
          </Form.Item>
          ) : null
        }

        <Form.Item label="Phone">
          {getFieldDecorator("phone", {
            initialValue: selectedUser.phone,
            rules: [
              {
                message: "Please input a phone!"
              }
            ]
          })(<Input placeholder="Please input a phone" />)}
        </Form.Item>

        <Form.Item label="Email">
          {getFieldDecorator("email", {
            initialValue: selectedUser.email,
            rules: [
              {
                  whitespace: true,
                  message: 'Please input an email!'
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
          })(<Input placeholder="Please input an email" />)}
        </Form.Item>

        <Form.Item label="Role">
          {getFieldDecorator("role_id", {
            initialValue: selectedUser.role_id,
            rules: [
              {
                message: "Please select a role!"
              }
            ]
          })(
            <Select>
              {
                roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

UserForm.propTypes = {
  setForm: PropTypes.func.isRequired, // the function for transfering the objects of form
  roles: PropTypes.array.isRequired,
  selectedUser: PropTypes.object
};

export default Form.create()(UserForm);
