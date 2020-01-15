import React, { Component } from 'react';
import Logo from '../assets/img/logo-gpro.png';
import { Link } from 'react-router-dom';
import '../custom.css';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        //console.log("escribiendo en input");
        this.setState({[e.target.name]: e.target.value });
        console.log(this.state);
    }

    login() {
        console.log("Login function");
    }

    render() {
        return (
            <div className="container-fluid minh-100 bg-login">
                <div className="container">
                    <div className="row justify-content-center align-items-center minh-100">
                        <div className="col-xs-2 col-sm-4 col-md-3 text-center">
                            <img src={Logo} width="90%" alt="" />
                        </div>
                        <div className="col-xs-10 col-sm-8 col-md-7">
                            <div className="card bg-login border-0">
                                <div className="card-body">
                                    <div className="card-title ct-font">Bievenido/a a GPRO</div>
                                    <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="username"
                                                placeholder="usuario" onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password"
                                                placeholder="contrase&ntilde;a" onChange={this.onChange}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={this.login}>
                                            Iniciar sesi&oacute;n</button>
                                    </form>
                                    <div className="mt-4">
                                        <p><Link to="/recov" className="text-light font-s1">&iquest;Ha olvidado su contrase&ntilde;a?</Link></p>
                                    </div>
                                    <div>
                                        <p className="text-secondary font-s2">GPRO. Copyright (c) 2020 Lisandro Caceres, Mariano Durand Mansilla, Dardo Nosti. Licensed under the MIT license.<br/>Versi&oacute;n 0.1. Enero 2020.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
