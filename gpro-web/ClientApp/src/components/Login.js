import React, { Component } from 'react';
import { authenticationService } from './authentication.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Logo from '../assets/img/logo-gpro.png';
import '../custom.css';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#0741AD';
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('El nombre de usuario es requerido.'),
                        password: Yup.string().required('La contrase\u00f1a es requerida.')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                >
                    {({ errors, status, touched, isSubmitting }) => (

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
                                                <Form>
                                                    <div className="form-group">
                                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">

                                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Iniciar sesi&oacute;n</button>
                                                    </div>
                                                    {status &&
                                                        <div className={'alert alert-danger'}>Usuario o contrase&ntilde;a incorrecta.</div>
                                                    }
                                                </Form>
                                                {/*
                                                    <div className="mt-4">
                                                        <p><Link to="/recov" className="text-light font-s1">&iquest;Ha olvidado su contrase&ntilde;a?</Link></p>
                                                    </div>
                                                    */}
                                                <div>
                                                    <p className="text-secondary font-s2">GPRO. Copyright (c) 2020 Lisandro Caceres, Mariano Durand Mansilla, Dardo Nosti. Licensed under the MIT license.<br />Versi&oacute;n 0.1. Enero 2020.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>        
        )
    }
}
