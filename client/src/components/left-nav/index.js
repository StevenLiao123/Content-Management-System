import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.jpeg';
import './index.less';

export default class LeftNav extends Component {
    render() {
        return (
            <Link to='/' className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>CMS</h1>
                </header>
            </Link>
        )
    }
}