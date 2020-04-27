import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Button, Table, Modal, message } from "antd";
import { ROLE_PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import { formatDate } from "../../utils/dateUtils";
import AddForm from "./add-form";
import AuthForm from "./auth-form";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { logout } from "../../redux/actions";

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [], // a list of roles
      role: {}, // the selected role
      showAddModalStatus: 0, // the status of modal, 0: both are hidden, 1: show add modal
      showAuthorizationModalStatus: 0
    };

    this.auth = React.createRef();
  }

  initColumn = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: "Create time",
        dataIndex: "create_time",
        render: create_time => formatDate(create_time)
      },
      {
        title: "Authorization time",
        dataIndex: "auth_time",
        render: formatDate
      },
      {
        title: "Authorization name",
        dataIndex: "auth_name"
      }
    ];
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result) {
      const roles = result.data.roles;
      this.setState({
        roles
      });
    }
  };

  onRow = role => {
    return {
      onClick: event => {
        this.setState({
          role
        });
      }
    };
  };

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // hide the modal
        this.setState({
          showAddModalStatus: 0
        });
        const { roleName } = values;
        this.form.resetFields();
        const result = await reqAddRole(roleName);
        if (result) {
          message.success("Role added successful!");
          const role = result.data.result;
          this.setState(state => ({
            roles: [...state.roles, role]
          }));
        } else {
          message.error("Role added fail!");
        }
      }
    });
  };

  updateRole = async () => {
    // hide the modal
    this.setState({
      showAuthorizationModalStatus: 0
    });

    const role = this.state.role;
    const menu = this.auth.current.getMenu();
    const auth_name = this.props.user.username;
    role.menu = menu;
    role.auth_name = auth_name;

    const result = await reqUpdateRole(role);
    if (result) {
      // Return back to login page if the current role equal to the user itself
      if (role._id === storageUtils.getUser().role_id) {
        memoryUtils.user = {};
        this.props.logout();
        message.success("The role has been changed, please sign-in again");
      } else {
        message.success("Update role sccuessful!");
        this.getRoles();
      }
    }
  };

  UNSAFE_componentWillMount() {
    this.initColumn();
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const user = this.props.user;
    if (!user || !user.username) {
      return <Redirect to="/login" />;
    }

    const {
      roles,
      role,
      showAddModalStatus,
      showAuthorizationModalStatus
    } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ width: 150 }}
          onClick={() => this.setState({ showAddModalStatus: 1 })}
        >
          Create a new role
        </Button>
        <Button
          type="primary"
          style={{ width: 150, margin: "0 15px" }}
          disabled={!role._id}
          onClick={() => this.setState({ showAuthorizationModalStatus: 1 })}
        >
          Set permissions
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: ROLE_PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: role => {
              this.setState({
                role
              });
            }
          }}
          onRow={this.onRow}
        />

        <Modal
          title="Create a new role"
          visible={showAddModalStatus === 1}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              showAddModalStatus: 0
            });
          }}
        >
          <AddForm
            setForm={form => {
              this.form = form;
            }}
          />
        </Modal>

        <Modal
          title="Set permissions"
          visible={showAuthorizationModalStatus === 1}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              showAuthorizationModalStatus: 0
            });
          }}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    );
  }
}

export default connect(state => ({ user: state.user }), { logout })(Role);
