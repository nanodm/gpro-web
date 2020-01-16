import React, { Component } from 'react';
import { userService } from './user.service';
import { authenticationService } from './authentication.service';

export class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.username}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.username} </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}