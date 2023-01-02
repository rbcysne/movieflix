import axios, { AxiosRequestConfig } from "axios";
import qs from 'qs';

import { LoginDataCredentials } from "types/LoginDataCredentials";
import { getLoginAuthData } from "./storage";
import history from "./history";


export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'client-cysne-id';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'cysne1234';

export const requestBackendLogin = ( loginDataCredentials : LoginDataCredentials ) => {
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    }

    const data = qs.stringify({
        ...loginDataCredentials,
        grant_type: 'password',
    });

    return axios ({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/oauth/token',
        data,
        headers,
    });
}

export const requestBackend = (requestConfig : AxiosRequestConfig) => {
    const headers = requestConfig.withCredentials
        ? {
            ...requestConfig.headers,
            Authorization: 'Bearer ' + getLoginAuthData().access_token,
          }
        : requestConfig.headers;

    return axios({ ...requestConfig, baseURL: BASE_URL, headers });
}



// Add a request interceptor
axios.interceptors.request.use(function (config) {

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
    if(error.response.status === 401 || error.response.status === 403) {
        history.push('/');
    }

    return Promise.reject(error);
  });