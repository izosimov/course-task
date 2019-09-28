import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import Home from './views/Home/Home'
Vue.use(Router)

const DEFAULT_TITLE = document.title

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Главная - Курсовая'
            }
        },
        {
            path: '/my-profile',
            name: 'my-profile',
            component: () => import(/* webpackChunkName: "profile" */ './views/Profile/Profile'),
            meta: {
                title: 'Мой профиль - Курсовая',
                crumbs: [
                    { label: 'Главная', linkTo: 'home' },
                    { label: 'Мой профиль', linkTo: '' }
                ]
            },
        },
        {
            path: '/create-task',
            name: 'create-task',
            meta: {
                title: 'Создать задание - Курсовая',
                crumbs: [
                    { label: 'Главная', linkTo: 'home' },
                    { label: 'Задание', linkTo: '' }
                ]
            },
            component: () => import(/* webpackChunkName: "task" */ './views/TaskPage/TaskPage')
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Логин - Курсовая'
            },
            component: () => import(/* webpackChunkName: "login" */ './views/Login/Login')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || DEFAULT_TITLE
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    const rolesValuesArr = Object.values(store.state.user.profile.role) // все возможные роли пользователя
    if (!rolesValuesArr.some(value => value) && to.name !== 'login') {
        // если все значения false и пользователь без роли => login page
        next('/login')
    } else {
        // пропускаем на страницу
        next()
    }
});

export default router
