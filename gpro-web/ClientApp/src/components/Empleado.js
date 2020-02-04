import React, { Component } from 'react';
import { empleadoService } from './empleado.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TblEmpleado } from './TblEmpleado';


export class Empleado extends Component {
    static displayName = Empleado.name;

    constructor(props) {
        super(props);

        this.state = {
            consulta: [],
            mostrar: false,
        };
    }

    limpiarPantalla = () => {
        this.setState({
            mostrar: false
        });
    }

    render() {
        const { mostrar, consulta } = this.state;

        return (
            <div className="container">
                <Formik
                    initialValues={{ dato: '', dni: '' }}

                    validationSchema={Yup.object().shape(
                        {
                            dato: Yup.string()
                                .when('dni', {
                                    is: (val) => val === undefined,
                                    then: Yup.string().required('Al menos un campo es requerido.'),
                                    otherwise: Yup.string().max(0, 'Ingrese datos en un solo campo.')
                                }),

                            cuit: Yup.string()
                                .when('dato', {
                                    is: (val) => val === undefined,
                                    then: Yup.string().required('Al menos un campo es requerido.'),
                                    otherwise: Yup.string().max(0, 'Ingrese datos en un solo campo.')
                                })

                        }, ['dato', 'dni']

                    )}

                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus();
                        if (values.dato && (values.dni === '')) {
                            empleadoService.getByString(values.dato)
                                .then(
                                    consulta => {
                                        this.setState({ consulta, mostrar: true });
                                        setSubmitting(false);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    })

                        } else {
                            empleadoService.getByDni(values.dni)
                                .then(
                                    consulta => {
                                        this.setState({ consulta: [consulta], mostrar: true });
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
                        <div>
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group">
                                            Nombre/Apellido:
                                                        <Field name="dato" type="text" className={'form-control' + (errors.dato && touched.dato ? ' is-invalid' : '')} />
                                            <ErrorMessage name="dato" component="div" className="invalid-feedback" />
                                            DNI:
                                                        <Field name="cuit" type="text" className={'form-control' + (errors.dni && touched.dni ? ' is-invalid' : '')} />
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
                    <TblEmpleado data={consulta}>
                    </TblEmpleado>
                }

            </div>
        );

    }
}