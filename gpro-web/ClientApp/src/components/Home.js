import React, { Component } from 'react';
import { userService } from './user.service';
import { authenticationService } from './authentication.service';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.paddingTop = '53px';
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.rol === "Admin" || currentUser.rol === "PM") {
            userService.getAll().then(users => this.setState({ users }));
        }
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1> {currentUser.rol === "Admin" && 
                    <p>Hola Mundo!</p>}</h1>
                <h1> {currentUser.rol !== "Admin" &&
                    <p>Hola Mundo 2!</p>}</h1>
                <h1>Hi {currentUser.username}!</h1>
                <h2> {currentUser.rol} </h2>
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