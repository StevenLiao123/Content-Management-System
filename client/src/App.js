import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './containers/Login';
import Admin from './containers/Admin';

export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </Switch>
    )
  }
}
