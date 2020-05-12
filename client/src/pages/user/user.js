import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { connect } from "react-redux";
import { formatDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import { USER_PAGE_SIZE } from '../../utils/constants';
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import UserForm from './user-form';
import memoryUtils from "../../utils/memoryUtils";
import { logout } from "../../redux/actions";

class User extends Component {
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
                    <LinkButton onClick={() => this.showUpdate(user)}>Edit</LinkButton>
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

  showAdd = () => {
    this.user = null; // remove the selected user
    this.setState({
      isShowUserStatus: true
    });
  }

  showUpdate = (user) => {
      this.user = user; // save user to this
      this.setState({
          isShowUserStatus: true
      });
  }

  deleteUser = (user) => {
      Modal.confirm({
          title: `Do you want to delete ${user.username} ?`,
          onOk: async () => {
            const result = await reqDeleteUser(user._id);
            if (result.data.status === "1") {
              message.success(`${user.username} has been deleted!`);
              this.getUsers();
            } else if (result.data.status === "0") {
              memoryUtils.user = {};
              memoryUtils.token = "";
              this.props.logout();
            }
          }
      });
  }

  addOrUpdateUser = async () => {
    const user = this.form.getFieldsValue();
    this.form.resetFields();

    // if the selected user exists, then assign the user id to the user object
    if(this.user && this.user._id) {
        user._id = this.user._id;
    }

    const result = await reqAddOrUpdateUser(user);
    if (result.data.status === "1") {
      if (user._id === this.props.user._id) {
        memoryUtils.user = {};
        this.props.logout();
        message.success("The user's role has been changed, please sign-in again");
      } else {
        message.success(`The user has been ${this.user ? "updated!" : "created!"}`);
        this.getUsers();
      }
    } else if (result.data.status === "0") {
      memoryUtils.user = {};
      memoryUtils.token = "";
      this.props.logout();
    }
    this.setState({
        isShowUserStatus: false
    });
  }

  getUsers = async () => {
    const result = await reqUsers();
    if (result.data.status === "1") {
      const { users, roles } = result.data;
      this.initRoleNames(roles);
      this.setState({
          users,
          roles
      });
    } else if (result.data.status === "0") {
      memoryUtils.user = {};
      memoryUtils.token = "";
      this.props.logout();
    } 
  }

  UNSAFE_componentWillMount() {
      this.initColumns();
  }

  componentDidMount() {
      this.getUsers();
  }

  render() {
    const { users, roles, isShowUserStatus } = this.state;
    const user = this.user || {};
    const title = <Button type="primary" onClick={this.showAdd}>Create a new user</Button>;

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
          title={user._id ? "Update an user" : "Create an new user"}
          visible={isShowUserStatus}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
              isShowUserStatus: false
            });
          }}
        >
          <UserForm 
            setForm={form => this.form = form}
            roles={roles}
            selectedUser={user}
            />
        </Modal>
      </Card>
    );
  }
}

export default connect(state => ({ user: state.user }), { logout })(User);
