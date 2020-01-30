import { authHeader } from './auth-header';
import { handleResponse } from './handle-response';

export const clienteService = {
    getByString,
    getById,
    newCliente
};



function getByString(dato) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/cliente/dato/${dato}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/cliente/cuit/${id}`, requestOptions).then(handleResponse);
}

function newCliente(cliente) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    };

    return fetch('http://localhost:60932/cliente/new', requestOptions).then(handleResponse);
}