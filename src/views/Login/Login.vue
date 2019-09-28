<template>
    <main class="container login-page">
        <div class="auth-card">
            <h3 class="auth-card__title">Вход</h3>
            <div class="auth-card__form">
                <el-input class="auth-card__input" placeholder="Логин" v-model="login"/>
                <el-input class="auth-card__input" placeholder="Пароль" show-password v-model="password"/>
                <Button label="Войти" type="primary" class="auth-card__enter-btn"/>
                <p class="hint-text auth-text" @click="isShowPopup = true">Не зарегистрированы?</p>
            </div>
        </div>

        <el-dialog title="Регистрация пользователя" :visible.sync="isShowPopup">
            <el-form :model="authForm">
                <el-form-item label="Придумайте логин">
                    <el-input v-model="authForm.login" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Придумайте пароль">
                    <el-input v-model="authForm.password" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Ваша роль">
                    <el-select v-model="authForm.role" placeholder="Укажите вашу роль">
                        <el-option label="Преподаватель" value="teacher"></el-option>
                        <el-option label="Студент" value="student"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="btn-footer">
                <Button label="Отмена" type="reject" width="200" class="mr-24" @click="isShowPopup = false"/>
                <Button label="Зарегистрироваться" width="200" type="primary" @click="isShowPopup = false"/>
            </span>
        </el-dialog>
    </main>
</template>

<script>
    import Button from '@/components/ui/Button/Button.vue'
    export default {
        components: {
            Button
        },
        data() {
            return {
                isShowPopup: false,
                login: '',
                password: '',
                authForm: {
                    login: '',
                    password: '',
                    role: ''
                },
                input: ''
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .login-page {
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .auth-card {
        width: 100%;
        max-width: 500px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        background: var(--white);
        box-shadow:var(--all-sides-shadow);
        &__title {
            margin-bottom: 16px;
        }
        &__form {
            width: 100%;
            max-width: 280px;
            display: flex;
            flex-direction: column;
        }
        &__input {
            margin-bottom: 24px;
        }
        &__enter-btn {
            margin-bottom: 8px;
        }
    }
    .auth-text {
        cursor: pointer;
        transition: var(--hover-transition);
        &:hover {
            color: var(--blue);
            text-decoration: underline;
            transition: var(--hover-transition);
        }
    }
</style>
