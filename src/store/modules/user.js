import { errHandler, apiClient } from '@/api.js';

const state = {
    profile: {
        login: null,
        role: {
            teacher: true,
            student: false
        },
        name: null
    },
    grants: null,
    userTasks: {
        transfers: [],
        familiarisations: []
    }
};

const getters = {

};

const actions = {
    RECEIVE_USER_PROFILE({ commit }) {
        return apiClient.get('/get-user')
            .then(({ data }) => {
                console.log('Пришли данные', data)
                commit('SET_PROFILE', data)
                return data // чтобы обработать их в компоненте
            })
            .catch(err => {
                errHandler(err)
            })
    }
};

const mutations = {
    SET_PROFILE(state, data) {
        state.profile.login = 'login'
        state.profile.role.teacher = true
        state.profile.name = 'Иван Иванович'
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
