<template>
    <header class="header">
        <div class="header__inner-wrap">
            <router-link tag="div" class="fl logo" :to="{ name: 'home' }">
                <h3>Курсовая</h3>
            </router-link>
            <div class="fl">
                <div class="user-photo-wrap mr-8">
                    <PersonIcon width="24" height="24"/>
                </div>
                <el-dropdown class="dropdown">
                    <span class="el-dropdown-link">
                        {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in menuItems" :key="item.label">
                            <RouterLink tag="li" :to="{ name: item.linkTo}">
                                {{ item.label }}
                            </RouterLink>
                        </el-dropdown-item>
                        <el-dropdown-item @click="exit">
                            <div class="exit">Выход</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    import PersonIcon from '_icons/person.svg'
    import { mapState } from 'vuex'
    export default {
        components: {
            PersonIcon
        },
        data() {
            return {
                menuItems: [
                    { label: 'Профиль', linkTo: 'my-profile' }
                ]
            }
        },
        computed: {
            ...mapState('user', ['profile']),
            userName() {
                // return this.profile.name
                return 'Иванов Иван Иванович'
            }
        },
        methods: {
            exit() {
                // удаляем токен из local storage
            }
        }
    }
</script>

<style lang="scss">
    .logo {
        cursor: pointer;
    }
    .header {
        border-bottom: 1px solid var(--grey);
        background: var(--white);
        &__inner-wrap {
            max-width: 1440px;
            display: flex;
            justify-content: space-between;
            padding: 8px 24px;
            margin: auto;
        }
    }
    .dropdown {
        min-width: 200px;
        cursor: pointer;
    }
</style>
