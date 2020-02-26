import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductHome from './home';
import ProductAddAndUpdate from './add-update';
import ProductDetails from './details';

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" component={ProductHome} exact />
                <Route path="/product/add-update" component={ProductAddAndUpdate} />
                <Route path="/product/details" component={ProductDetails} />
                <Redirect to="/product" />
            </Switch>
        )
    }a
}