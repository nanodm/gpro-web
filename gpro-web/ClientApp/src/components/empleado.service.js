import { authHeader } from './auth-header';
import { handleResponse } from './handle-response';

export const empleadoService = {
    getByString,
    getByDni,
    newEmpleado
};

function getByString(dato) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/empleado/empleados/${dato}`, requestOptions).then(handleResponse);
}

function getByDni(dni) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/empleado/documento/${dni}`, requestOptions).then(handleResponse);
}

function newEmpleado(empleado) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify(empleado)
    };

    return fetch('http://localhost:60932/empleado/new', requestOptions).then(handleResponse);
}