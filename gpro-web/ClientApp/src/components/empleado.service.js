import { authHeader } from './auth-header';
import { handleResponse } from './handle-response';

export const empleadoService = {
    getByString,
    getByDni,
};

function getByString(dato) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/empleado/empleados/${dato}`, requestOptions).then(handleResponse);
}

function getByDni(dni) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:60932/empleado/documento/${dni}`, requestOptions).then(handleResponse);
}
