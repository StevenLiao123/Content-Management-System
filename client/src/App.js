import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './pages/signUp';
import Login from './pages/login';
import Admin from './pages/admin';

export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </Switch>
    )
  }
}
