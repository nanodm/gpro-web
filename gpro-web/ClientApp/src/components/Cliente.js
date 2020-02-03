import React, { Component } from 'react';
import { clienteService } from './cliente.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { MDBDataTable } from 'mdbreact';
import { TblCliente } from './TblCliente';


export class Cliente extends Component {
    static displayName = Cliente.name;

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
            <div>
                <Formik
                    initialValues={{ dato: '', cuit: '' }}

                    validationSchema={Yup.object().shape(
                        {
                            dato: Yup.string()
                                .when('cuit', {
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

                        }, ['dato', 'cuit']

                    )}

                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus();
                        if (values.dato && (values.cuit === '')) {
                            clienteService.getByString(values.dato)
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
                                clienteService.getById(values.cuit)
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
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group">
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

                {/*
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
                    </div>}*/}

                {/*{mostrar && <MDBDataTable
                    striped
                    bordered
                    small
                    noBottomColumns
                    searchLabel="Buscar"
                    entriesLabel="Entradas"
                    paginationLabel={['Anterior', 'Siguiente']}
                    infoLabel={['Mostrando', 'a', 'de', 'entradas']}
                    data={data}
                />}*/}

                {mostrar &&
                    <TblCliente data={consulta} className="table table-striped table-bordered dt-responsive nowrap">

                    </TblCliente>
                }
            </div>
        );
        
    }
}

