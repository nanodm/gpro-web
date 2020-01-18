//import config from 'config';
import { authHeader } from './auth-header';
import { handleResponse } from './handle-response';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch('http://localhost:60932/usuarios', requestOptions).then(handleResponse);
}