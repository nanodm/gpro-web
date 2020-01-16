import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router';
//import { Router, Route, Link } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/Login';
import { HomePage } from './components/HomePage';
import { Recov } from './components/Recov';

import './custom.css'
import { authenticationService } from './components/authentication.service';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }
    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
    }
    

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={window.history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                        </div>
                        </nav>
                    }
                    <PrivateRoute exact path="/" component={ HomePage } />
                    <Route path="/login" component={Login} />
                    <Route path="/recov" component={Recov} />

                </div>
            </Router>
        );
    }
}
