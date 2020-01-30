import React, { Component } from 'react';
import { userService } from './user.service';
import { authenticationService } from './authentication.service';
import { clienteService } from './cliente.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';



export class NuevoCliente extends Component {
    static displayName = NuevoCliente.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.paddingTop = '53px';
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            cliente: ''
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.rol === "Admin" || currentUser.rol === "PM") {
            userService.getAll().then(users => this.setState({ users }));
        }
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ idcliente: '', razonsocialcliente: '', apellidocliente: '', nombrecliente: '', direccioncliente: '', telefonocliente: '', emailcliente: '' }}
                    validate={values => {
                        let errors = {};
                        if (!values.idcliente) {
                            errors = 'Ingrese CUIT.';
                        } if (!values.razonsocialcliente && !values.apellidocliente && !values.nombrecliente) {
                            errors = 'Ingrese apellido y nombre o razon social.';
                        } if (!values.direccioncliente) {
                            errors = 'Ingrese domicilio.';
                        }
                        if (!values.telefonocliente) {
                            errors = 'Ingrese teléfono.';
                        }
                        if (!values.emailcliente) {
                            errors = 'Ingrese email.';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus();
                        clienteService.newCliente(values).then(
                            cli => {
                                const { from } = this.props.location.state || { from: { pathname: "/new" } };
                                this.props.history.push(from);
                            },
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                        
                    }
                    }
                >
                    {({ error, status, touched, isSubmitting }) => (

                        <div className="container-fluid minh-100 ">
                            <div className="container">
                                <div className="row justify-content-flex-start align-items-flex-start minh-100">
                                    <div className="buscar-clientes">
                                        <div className="card border-0">
                                            <div className="card-body">
                                                <Form>
                                                    <div className="form-group txt-color">
                                                        CUIT:
                                                        <Field name="idcliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="idcliente" component="div" className="invalid-feedback" />
                                                        Razón Social:
                                                        <Field name="razonsocialcliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="razonsocialcliente" component="div" className="invalid-feedback" />
                                                        Apellido:
                                                        <Field name="apellidocliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="apellidocliente" component="div" className="invalid-feedback" />
                                                        Nombre:
                                                        <Field name="nombrecliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="nombrecliente" component="div" className="invalid-feedback" />
                                                        Domicio:
                                                        <Field name="direccioncliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="direccioncliente" component="div" className="invalid-feedback" />
                                                        Teléfono:
                                                        <Field name="telefonocliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="telefonocliente" component="div" className="invalid-feedback" />
                                                        e-mail:
                                                        <Field name="emailcliente" type="text" className={'form-control'} />
                                                        <ErrorMessage name="emailcliente" component="div" className="invalid-feedback" />
                                                    </div>

                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                                    </div>
                                                </Form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}

class Clientes {
    constructor(cuit, raz, ap, nom, dom, tel, mail) {
        this.cuit = cuit;
        this.raz = raz;
        this.ap = ap;
        this.nom = nom;
        this.dom = dom;
        this.tel = tel;
        this.mail = mail;
    }
}