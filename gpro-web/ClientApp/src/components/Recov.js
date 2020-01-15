import React, { Component } from 'react';
import Logo from '../assets/img/logo-gpro.png';
import { Link } from 'react-router-dom';
import '../custom.css';

export class Recov extends Component {
    static displayName = Recov.name;

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.enviar = this.enviar.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        //console.log("escribiendo en input");
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    enviar() {
        console.log("Enviar function");
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
                                    <div>
                                        <Link to="/login" className="text-light font-s1">[ Volver ]</Link>
                                    </div>
                                    <div className="card-title ct-font">Recuperar contrase&ntilde;a</div>
                                    <div><p className="text-light">Escriba la direcci&oacute;n de correo electr&oacute;nico de la cuenta
                                        a la que no puede acceder. Le enviaremos instrucciones para
                                        reestablecer la contrase&ntilde;a.</p>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="email"
                                                placeholder="correo electr&oacute;nico" onChange={this.onChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={this.enviar}>
                                            Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
