import axios from 'axios';
import router from './router'

export const errHandler = err => {
    if (err.response.status === 403 || err.response.status === 404) {
        throw Error(err.response.data.error)
    } else {
        throw Error('Ошибка сервера! Попробуйте позднее.')
    }
};

export const apiClient = axios.create({
    baseURL: 'localhost',
    headers: {
        credentials: "same-origin",
        withCredentials: true
    }
})

// При каждом ответе сервера, если получаем ответ 401 - пользователь не авторизован => login page
axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response.status === 401) {
            router.push({ name: 'login' })
        }
        return Promise.reject(err.response);
    }
);
