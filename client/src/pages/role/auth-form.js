import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

const { TreeNode } = Tree;

// the form for updating a role
class AuthForm extends Component {
  constructor(props) {
    super(props);

    const { menu } = this.props.role;
    this.state = {
      checkedKeys: menu
    };
  }

  getMenu = () => {
    return this.state.checkedKeys;
  };

  getTreeNodes = menuList => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });
  };

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }

  componentWillReceiveProps(nextProps) {
    const menu = nextProps.role.menu;
    this.setState({
      checkedKeys: menu
    });
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;

    return (
      <div>
        <Form.Item label="Role's name">
          <Input value={role.name} disabled />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll={true}
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="Authorization" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

AuthForm.propTypes = {
  role: PropTypes.object.isRequired
};

export default AuthForm;
