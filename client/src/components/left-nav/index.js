import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import { connect } from "react-redux";
import { setHeaderTitle } from "../../redux/actions";

import menuList from "../../config/menuConfig";
import logo from "../../assets/images/logo.jpeg";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // check menu permissions
  hasAuth = item => {
    const { key, isPublic } = item;
    const menu = this.props.user.role[0] ? this.props.user.role[0].menu : null;
    const username = this.props.user.username;

    if (username === "admin" || isPublic || menu.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      return !!item.children.find(child => menu.indexOf(key.child) !== -1);
    }

    return false;
  };

  getMenuNodes = menuList => {
    // get the path of current route
    const path = this.props.location.pathname;

    return menuList.reduce((pre, item) => {
      // show the relevant menu based on the role's menu of the user
      if (this.hasAuth(item)) {
        if (!item.children) {
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeaderTitle(item.title);
          }
          pre.push(
            <Menu.Item key={item.key}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeaderTitle(item.title)}
              >
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          // find a subitem that is macthed by the current route
          const subItem = item.children.find(
            subItem => path.indexOf(subItem.key) === 0
          );

          if (subItem) {
            this.openKey = item.key;
          }

          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }

      return pre;
    }, []);

    // return menuList.map(item => {
    //   if (!item.children) {
    // if (item.key === path || path.indexOf(item.key) === 0) {
    //   this.props.setHeaderTitle(item.title);
    // }
    //     return (
    //       <Menu.Item key={item.key}>
    //         <Link
    //           to={item.key}
    //           onClick={() => this.props.setHeaderTitle(item.title)}
    //         >
    //           <Icon type={item.icon} />
    //           <span>{item.title}</span>
    //         </Link>
    //       </Menu.Item>
    //     );
    //   } else {
    //     // find a subitem that is macthed by the current route
    //     const subItem = item.children.find(
    //       subItem => path.indexOf(subItem.key) === 0
    //     );

    //     if (subItem) {
    //       this.openKey = item.key;
    //     }

    //     return (
    //       <SubMenu
    //         key={item.key}
    //         title={
    //           <span>
    //             <Icon type={item.icon} />
    //             <span>{item.title}</span>
    //           </span>
    //         }
    //       >
    //         {this.getMenuNodes(item.children)}
    //       </SubMenu>
    //     );
    //   }
    // });
  };

  //  execute the getMenuNodes function before the first render
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // get the path of current route
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      // this expression is used to determine the path of the current product or sub-route of the product.
      path = "/product";
    }
    const openKey = this.openKey;

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>CMS</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }), { setHeaderTitle })(
  withRouter(LeftNav)
);
