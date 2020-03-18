import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { setHeaderTitle } from '../../redux/actions';

import menuList from '../../config/menuConfig';
import logo from '../../assets/images/logo.jpeg';
import './index.less';


const { SubMenu } = Menu;

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        // get the path of current route
        const path = this.props.location.pathname;

        return menuList.map(item => {
            if (!item.children) {
                if (item.key===path || path.indexOf(item.key)===0) {
                    this.props.setHeaderTitle(item.title);
                }
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // find a subitem that is macthed by the current route
                const subItem = item.children.find(subItem => path.indexOf(subItem.key)===0);

                if (subItem) {
                    this.openKey = item.key;
                }

                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        });
    }

    //  execute the getMenuNodes function before the first render
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        // get the path of current route
        let path = this.props.location.pathname;
        if(path.indexOf('/product')===0) { // this expression is used to determine the path of the current product or sub-route of the product.
            path = '/product';
        }
        const openKey = this.openKey


        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>CMS</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    { setHeaderTitle }
)(withRouter(LeftNav));