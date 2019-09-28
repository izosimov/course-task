import { errHandler, apiClient } from '@/api.js';

const state = {
    labs: [],
    courseWorks: []
};

const getters = {

};

const actions = {
    GET_TASKS({}, { taskType }) {
        let url = ''
        switch (taskType) {
            case 'labs':
                url = '/get-labs'
            case 'courses':
                url = '/get-courses'
        }
        return apiClient.get(url)
            .then(({ data }) => {
                console.log('Пришли данные', data)
                return data // чтобы обработать их в компоненте
            })
            .catch(err => {
                errHandler(err)
            })
    },
    CHANGE_TASK({}, { taskType }) {

    },
    DELETE_TASK({}, { taskType }) {

    },
    CREATE_TASK({}, { taskData, taskType }) {
        let url = ''
        switch (taskType) {
            case 'labs':
                url = '/create-lab'
            case 'courses':
                url = '/create-course'
        }
        return apiClient.post(url, taskData)
            .then(({ data }) => {
                console.log('Обрабатываем успешный ответ', data)
                return data // чтобы обработать его в компоненте
            })
    }
};

const mutations = {
    SET_LABS() {

    },
    SET_COURSE_WORKS() {

    },
    ADD_LAB() {

    },
    ADD_COURSE_WORK() {

    },
    DELETE_LAB() {

    },
    DELETE_COURSE_WORK() {

    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
