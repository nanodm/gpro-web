import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Role } from './components/role';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { HomePage } from './components/HomePage';
/*import { Recov } from './components/Recov';*/

import './custom.css'
import { authenticationService } from './components/authentication.service';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAdmin: false
        }
    }

    componentDidMount() {
        //authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={window.history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/login" className="nav-item nav-link">Admin</Link>}
                            <button type="button" className="btn btn-primary nav-item" onClick={this.logout}>Logout</button>
                            </div>
                        </nav>
                    }
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/*<Route path="/recov" component={Recov} />*/}
                </div>
            </Router>
        );
    }
}
