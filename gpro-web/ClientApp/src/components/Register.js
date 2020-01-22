import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userService } from './user.service';

import Logo from '../assets/img/logo-gpro.png';
import '../custom.css';

export class Register extends Component {

    /*
    constructor(props) {
        super(props);
    }
    */

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        idempleado: 0,
                        idrol: 0
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('El nombre de usuario es requerido.'),
                        password: Yup.string().required('La contrase\u00f1a es requerida.'),
                        idempleado: Yup.string().required('Requerido.'),
                        idrol: Yup.string().required('Requerido.')
                    })}
                    onSubmit={({ username, password, idempleado, idrol }, { setStatus, setSubmitting }) => {
                        setStatus();
                        var obj = { username, password, idempleado, idrol };
                        userService.register(obj)
                            .then(
                                response => {
                                    //alert("enviado");
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <div className="container-fluid minh-100 bg-login">
                            <div className="container">
                                <div className="row justify-content-center align-items-center minh-100">
                                    <div className="col-xs-2 col-sm-4 col-md-3 text-center">
                                        <img src={Logo} width="90%" alt="" />
                                    </div>
                                    <div className="col-xs-10 col-sm-8 col-md-7">
                                        <div className="card bg-login border-0">
                                            <div className="card-body">
                                                <div className="card-title ct-font">Registro de Usuarios</div>
                                                <Form>
                                                    <div className="form-group">
                                                        <label htmlFor="username">Username</label>
                                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="idempleado">Id Empleado</label>
                                                        <Field name="idempleado" type="number" className={'form-control' + (errors.idempleado && touched.idempleado ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="idempleado" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="idrol">Id Rol</label>
                                                        <Field name="idrol" type="number" className={'form-control' + (errors.idrol && touched.idrol ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="idrol" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Registrar</button>
                                                    </div>
                                                    {status &&
                                                        <div className={'alert alert-danger'}>Usuario o contrase&ntilde;a incorrecta.</div>
                                                    }
                                                </Form>
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
                />
            </div>
        )
    }
}