import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { formatDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import { USER_PAGE_SIZE } from '../../utils/constants';
import { reqUsers, reqDeleteUser, reqAddUser } from '../../api';
import UserForm from './user-form';

export default class User extends Component {
  state = {
      users: [],
      roles: [],
      isShowUserStatus: false,
  };  

  initColumns = () => {
    this.columns = [
        {
            title: "Username",
            dataIndex: "username"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Registration Date",
            dataIndex: "create_time",
            render: formatDate  
        },
        {
            title: "Role",
            dataIndex: "role_id",
            render: (role_id) => this.roleNames[role_id]
        },
        {
            title: "Action",
            render: (user) => (
                <span>
                    <LinkButton>Edit</LinkButton>
                    <LinkButton onClick={() => this.deleteUser(user)}>Delete</LinkButton>
                </span>
            )
        },
    ];
  }

  initRoleNames = (roles) => {
      const roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      },{});

      this.roleNames = roleNames;
  }

  deleteUser = (user) => {
      Modal.confirm({
          title: `Do you want to delete ${user.username} ?`,
          onOk: async () => {
            const result = await reqDeleteUser(user._id);
            if(result) {
                message.success(`${user.username} has been deleted!`);
                this.getUsers();
            }
          }
      });
  }

  addOrUpdateUser = async () => {
    const user = this.form.getFieldsValue();
    this.form.resetFields();

    const result = await reqAddUser(user);
    if(result) {
        message.success("The user has been created!");
        this.getUsers();
    }
    this.setState({
        isShowUserStatus: false
    });
  }

  getUsers = async () => {
    const result = await reqUsers();
    if(result) {
        const { users, roles } = result.data;
        this.initRoleNames(roles);
        this.setState({
            users,
            roles
        });
    }   
  }

  componentWillMount() {
      this.initColumns();
  }

  componentDidMount() {
      this.getUsers();
  }

  render() {
    const { users, roles, isShowUserStatus } = this.state;
    const title = <Button type="primary" onClick={() => this.setState({isShowUserStatus: true})}>Create a new user</Button>;

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{
            defaultPageSize: USER_PAGE_SIZE 
          }}
        />

        <Modal
          title="Add a User"
          visible={isShowUserStatus}
          onOk={this.addOrUpdateUser}
          onCancel={() => this.setState({isShowUserStatus: false})}
        >
          <UserForm 
            setForm={form => this.form = form}
            roles={roles}
            />
        </Modal>
      </Card>
    );
  }
}
