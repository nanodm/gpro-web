import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class TblCliente extends Component {

    componentDidMount() {
        console.log(this.el);
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                data: this.props.data,
                columns: [
                    { 'title': 'CUIT', 'data': 'idCliente'},
                    { 'title': 'Razón Social', 'data': 'razonSocialCliente'},
                    { 'title': 'Apellido', 'data': 'apellidoCliente' },
                    { 'title': 'Nombre', 'data': 'nombreCliente' },
                    { 'title': 'Dirección', 'data': 'direccionCliente' },
                    { 'title': 'Teléfono', 'data': 'telefonoCliente' },
                    { 'title': 'E-Mail', 'data': 'emailCliente' }
                ]
            }
        )
    }

    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true); 
    }

    render() {
        return (
            <div>
                <table className="display" width="100%" ref={el => this.el = el}>
                </table>
            </div>
        )
    }
    
}