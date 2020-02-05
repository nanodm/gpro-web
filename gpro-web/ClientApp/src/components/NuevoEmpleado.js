import React, { Component } from 'react';
import { empleadoService } from './empleado.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../custom.css';
import swal from 'sweetalert';
import { log } from 'util';

export class NuevoEmpleado extends Component {
    static displayName = NuevoEmpleado.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.paddingTop = '53px';
        this.state = {
            consulta: [],
            post: null
        };
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            apellidoempleado: '',
                            nombreempleado: '',
                            fechaingreso: '',
                            telefono: '',
                            domicilio: '',
                            localidad: '',
                            provincia: '',
                            dni: '',
                            nacionalidad: ''
                        }
                    }

                    validationSchema={Yup.object().shape(
                        {
                            apellidoempleado: Yup.string().required('Campo requerido.'),

                            nombreempleado: Yup.string().required('Campo requerido.'),

                            fechaingreso: Yup.string().required('Campo requerido.'),

                            telefono: Yup.string().required('Campo requerido.'),

                            domicilio: Yup.string().required('Campo requerido.'),

                            localidad: Yup.string().required('Campo requerido.'),

                            provincia: Yup.string().required('Campo requerido.'),

                            dni: Yup.string().required('Campo requerido.'),

                            nacionalidad: Yup.string().required('Campo requerido.')

                        })}

                    onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                        setStatus();

                        empleadoService.getByDni(values.dni)
                            .then(
                                consulta => {
                                    this.setState({ consulta: [consulta], mostrar: true });
                                    setSubmitting(false);
                                },
                                error => {
                                    setSubmitting(false);

                                    if (error === 'Not Found') {
                                        empleadoService.newEmpleado(values).then(
                                            emp => {
                                                console.log(emp);
                                                return emp;
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            });
                                        if (error === 'Not Found') {
                                            swal({
                                                title: "Guardado con éxito",
                                                text: "Presione aceptar",
                                                icon: "success",
                                                button: "Aceptar"
                                            });
                                            error = '';
                                            this.post = 'ok';

                                        }
                                    }
                                    resetForm();
                                    setStatus(error);
                                });
                        if (this.post !== 'ok') {
                            setStatus('Found');
                            this.post = null;
                        }
                    }
                    }>
                    {({ errors, status, touched, isSubmitting }) => (

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group">
                                            Apellido:
                                                        <Field name="apellidoempleado" type="text" className={'form-control' + (errors.apellidoempleado && touched.apellidoempleado ? ' is-invalid' : '')} />
                                            <ErrorMessage name="apellidoempleado" component="div" className="invalid-feedback" />
                                            Nombre:
                                                        <Field name="nombreempleado" type="text" className={'form-control' + (errors.nombreempleado && touched.nombreempleado ? ' is-invalid' : '')} />
                                            <ErrorMessage name="nombreempleado" component="div" className="invalid-feedback" />
                                            DNI:
                                                        <Field name="dni" type="text" className={'form-control' + (errors.dni && touched.dni ? ' is-invalid' : '')} />
                                            <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                                            Fecha de ingreso:
                                                        <Field name="fechaingreso" type="text" className={'form-control' + (errors.fechaingreso && touched.fechaingreso ? ' is-invalid' : '')} />
                                            <ErrorMessage name="fechaingreso" component="div" className="invalid-feedback" />
                                            Telefono:
                                                        <Field name="telefono" type="text" className={'form-control' + (errors.telefono && touched.telefono ? ' is-invalid' : '')} />
                                            <ErrorMessage name="telefono" component="div" className="invalid-feedback" />
                                            Domicilio:
                                                        <Field name="domicilio" type="text" className={'form-control' + (errors.domicilio && touched.domicilio ? ' is-invalid' : '')} />
                                            <ErrorMessage name="domicilio" component="div" className="invalid-feedback" />
                                            Localidad:
                                                        <Field name="localidad" type="text" className={'form-control' + (errors.localidad && touched.localidad ? ' is-invalid' : '')} />
                                            <ErrorMessage name="localidad" component="div" className="invalid-feedback" />
                                            Provincia:
                                                        <Field name="provincia" type="text" className={'form-control' + (errors.provincia && touched.provincia ? ' is-invalid' : '')} />
                                            <ErrorMessage name="provincia" component="div" className="invalid-feedback" />
                                            Nacionalidad:
                                                        <Field name="nacionalidad" type="text" className={'form-control' + (errors.nacionalidad && touched.nacionalidad ? ' is-invalid' : '')} />
                                            <ErrorMessage name="nacionalidad" component="div" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Guardar</button>
                                        </div>
                                        {status &&
                                            <div className={'alert alert-danger'}>El DNI ya existe en la Base de Datos.</div>
                                        }
                                    </Form>

                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}
