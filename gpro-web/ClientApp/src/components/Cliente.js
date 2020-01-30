import React, { Component } from 'react';
import { userService } from './user.service';
import { authenticationService } from './authentication.service';
import { clienteService } from './cliente.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export class Cliente extends Component {
    static displayName = Cliente.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.paddingTop = '53px';
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            consulta: [],
            mostrar: false
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.rol === "Admin" || currentUser.rol === "PM") {
            userService.getAll().then(users => this.setState({ users }));
        }
    }

    limpiarPantalla = () => {
        this.setState({
            mostrar: false
        });
    }

    render() {
        const { consulta, mostrar } = this.state;
        return (
            <div>
                <Formik
                    initialValues={{ dato: '', cuit: '' }}
                    validationSchema={Yup.object().shape(
                        {
                            dato: Yup.string()
                                .when('cuit', {
                                    is: (val) => val == undefined,
                                    then: Yup.string().required('Al menos un campo es requerido.'),
                                    otherwise: Yup.string().max(0, 'Ingrese datos en un solo campo.')
                                }),

                            cuit: Yup.string()
                                .when('dato', {
                                    is: (val) => val == undefined,
                                    then: Yup.string().required('Al menos un campo es requerido.'),
                                    otherwise: Yup.string().max(0, 'Ingrese datos en un solo campo.')
                                })

                        }, ['dato', 'cuit']

                    )}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus();
                        if (values.dato && (values.cuit == '')) {
                            clienteService.getByString(values.dato)
                                .then(
                                    consulta => {
                                        this.setState({ consulta });
                                        this.setState({ mostrar: true });
                                        setSubmitting(false);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    })
                        } else if (values.dato && values.cuit) {
                            setSubmitting(false);
                        } else {
                            clienteService.getById(values.cuit)
                                .then(
                                    consulta => {
                                        this.setState({ consulta: [consulta] });
                                        this.setState({ mostrar: true });
                                        setSubmitting(false);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    });
                        }
                    }
                    }
                >
                    {({ errors, status, touched, isSubmitting }) => (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group txt-color">
                                            Nombre/Apellido/Razón social:
                                                        <Field name="dato" type="text" className={'form-control' + (errors.dato && touched.dato ? ' is-invalid' : '')} />
                                            <ErrorMessage name="dato" component="div" className="invalid-feedback" />
                                            CUIT:
                                                        <Field name="cuit" type="text" className={'form-control' + (errors.cuit && touched.cuit ? ' is-invalid' : '')} />
                                            <ErrorMessage name="cuit" component="div" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Buscar</button>
                                            <button type="reset" className="btn btn-primary ml-4" onClick={this.limpiarPantalla} disabled={isSubmitting}>Limpiar</button>
                                        </div>
                                        {status &&
                                            <div className={'alert alert-danger'}>Búsqueda sin resultados.</div>
                                        }
                                    </Form>

                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
                {mostrar &&
                    <div>
                        <div className="container">
                            <thead>
                                <tr>
                                    <th className="column-tb1">CUIT</th>
                                    <th className="column-tb3">Razon Social</th>
                                    <th className="column-tb2">Apellido</th>
                                    <th className="column-tb2">Nombre</th>
                                    <th className="column-tb3">Domicilio</th>
                                    <th className="column-tb1">Teléfono</th>
                                    <th className="column-tb2">E-Mail</th>
                                </tr>
                            </thead>
                            {consulta.map(cons =>
                                <tr>
                                    <td className="column-tb1">{cons.idCliente}</td>
                                    <td className="column-tb3">{cons.razonSocialCliente}</td>
                                    <td className="column-tb2">{cons.apellidoCliente}</td>
                                    <td className="column-tb2">{cons.nombreCliente}</td>
                                    <td className="column-tb3">{cons.direccionCliente}</td>
                                    <td className="column-tb1">{cons.telefonoCliente}</td>
                                    <td className="column-tb2">{cons.emailCliente}</td>
                                </tr>)}
                        </div>
                    </div>}
            </div>
        );
    }
}