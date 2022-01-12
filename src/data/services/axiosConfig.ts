import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient() {
    const { 'client.auth.token': token } = parseCookies()
    const https = require('https');
    const api = axios.create({
        baseURL: '/api/',
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })

    api.defaults.headers['Content-Type'] = 'application/json'

    api.interceptors.request.use(config => {
        console.log(config);

        return config;
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api;
}