import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import tasks from './modules/tasks.js'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        tasks
    }
})

