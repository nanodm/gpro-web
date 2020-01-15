import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Login } from './components/Login';
import { Recov } from './components/Recov';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
            <switch>
                <Route exact path="/">
                    {this.loggedIn ? <Redirect to="/home" /> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login">
                    {this.loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
                </Route>
                <Route path='/login' component={Login} />
                <Route path='/recov' component={Recov} />
            </switch>
        );
    }
}
