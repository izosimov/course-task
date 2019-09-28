<template>
    <main class="page-with-crumbs">
        <BreadCrumbs class="mb-24"/>
        <div class="page-head mb-40">
            <h1>{{ pageTitle }}</h1>
            <div class="task-type">{{ taskType }}</div>
        </div>
        <section class="task mb-40">
            <div class="task__info mb-24">
                <div class="task__input">
                    <p class="hint-text mb-8">Введите название задания</p>
                    <p v-if="readOnly">{{ taskData.title }}</p>
                    <el-input v-else placeholder="Введите название" v-model="newTaskData.title"/>
                </div>
                <div class="task__input">
                    <p class="hint-text mb-8">Поиск студента по ФИО</p>
                    <p v-if="readOnly">{{ taskData.fio }}</p>
                    <el-autocomplete v-else
                        class="task__input autocomplete" v-model="autocompleteValue" :trigger-on-focus="false"
                        :fetch-suggestions="querySearch" placeholder="Введите ФИО" @select="handleSelect">
                        <i class="el-icon-search el-input__icon" slot="suffix"/>
                        <template slot-scope="{ item }">
                            <div v-if="item.fio">
                                {{ item.fio }}
                            </div>
                            <div v-else>Поиск не дал результатов</div>
                        </template>
                    </el-autocomplete>
                </div>
            </div>
            <div class="mb-24">
                <p class="hint-text mb-8">Описание задания</p>
                <p v-if="readOnly" class="text-style">{{ taskData.description || '-' }}</p>
                <textarea v-else v-model="newTaskData.description" class="task__desc"/>
            </div>
            <div class="task__info">
                <TaskInput :value="readOnly ? taskData.telnum : newTaskData.telnum"
                           hint="Номер телефона студента"/>
                <TaskInput :value="readOnly ? taskData.mail : newTaskData.mail"
                           hint="Почтовый адрес"/>
                <TaskInput :value="readOnly ? taskData.faculty : newTaskData.faculty"
                           hint="Факультет"/>
                <TaskInput :value="readOnly ? taskData.group : newTaskData.group"
                           hint="Группа"/>
                <div class="task__input">
                    <p class="hint-text mb-8">Дисциплина</p>
                    <p v-if="readOnly">{{ taskData.discipline }}</p>
                    <el-input v-else placeholder="Введите название дисциплины" v-model="newTaskData.discipline"/>
                </div>
                <div class="task__input">
                    <p class="hint-text mb-8">Дата создания</p>
                    <p v-if="readOnly">{{ taskData.issueDate }}</p>
                    <p>{{ today }}</p>
                </div>
                <div class="task__input">
                    <p class="hint-text mb-8">Крайний срок сдачи</p>
                    <p v-if="readOnly">{{ taskData.thesisDate }}</p>
                    <el-date-picker
                            v-model="newTaskData.thesisDate" popper-class="date"
                            :picker-options="datePickerOptions" class="calendar"
                            value-format="yyyy.MM.dd" format="d MMM yyyy г."
                            type="date" placeholder="Выберите день"/>
                </div>
                <div class="task__input">
                    <p class="hint-text mb-8">Готовность</p>
                    <div v-if="newTaskData.completed">
                        <Button v-if="profile.role.teacher" label="Скачать" type="info">
                            <DownloadIcon width="24" height="24"/>
                        </Button>
                    </div>
                    <p v-else>Задание пока не выполнено</p>
                </div>
            </div>
        </section>
        <div class="actions">
            <el-upload
                    v-if="profile.role.student" class="upload-demo mr-24" ref="upload"
                    action="url" :auto-upload="false" with-credentials multiple>
                <Button slot="trigger" type="info" label="Выбрать файл"
                        width="170"/>
            </el-upload>
            <Button v-if="profile.role.student" type="primary" label="Отправить файл(ы)" class="mr-24"
                    width="170" @click="uploadFile"/>
            <Button v-if="profile.role.teacher" type="primary" label="Создать" width="200"></Button>
        </div>
    </main>
</template>

<script>
    import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
    import TaskInput from './TaskInput/TaskInput'
    import Button from '@/components/ui/Button/Button'
    import DownloadIcon from '_icons/download.svg'
    import { mapState, mapActions } from 'vuex'
    export default {
        components: {
            BreadCrumbs,
            TaskInput,
            Button,
            DownloadIcon
        },
        data() {
            return {
                autocompleteValue: '',
                datePickerOptions: {
                    disabledDate(date) {
                        return date < new Date().setDate(new Date().getDate() - 1);
                    }
                },
                newTaskData: {
                    fio: '', id: null, telnum: '', faculty: '', group: '', mail: '', title: '',
                    discipline: '', description: '', issueDate: '', thesisDate: '', completed: false
                },
                readOnly: null,
                type: '', // если не readOnly - получаем type из params роутера
                taskData: {} // если не readOnly - получаем taskData из params роутера
            }
        },
        computed: {
            ...mapState('user', ['profile']),
            pageTitle() {
                return this.readOnly ? 'Текущее задание' : 'Создание нового задания'
            },
            taskType() {
                switch (this.type) {
                    case 'labs':
                        return 'Лабораторная работа';
                    case 'courses':
                        return 'Курсовая работа';
                }
            },
            today() {
                const date = new Date()
                const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
                return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`
            }
        },
        methods: {
            ...mapActions('tasks', ['CHANGE_TASK', 'CREATE_TASK', 'SEATCH_STUDENTS']),
            uploadFile() {
                // чтобы отправить файлы
                this.$refs.upload.submit();
            },
            async querySearch(value, callback) {
                try {
                    // const results = await this.SEATCH_STUDENTS({ fio: value })
                    // if (Array.isArray(results)) callback(results);
                    callback([
                        { fio: 'Иван Петрович Иванов', id: 1 },
                        { fio: 'Олег Андреевич Петров', id: 2 },
                        { fio: 'Пётр Олегович Андреев', id: 3 }
                    ]);
                } catch (e) {
                    callback([{}])
                }
            },
            handleSelect(item) {
                this.autocompleteValue = this.newTaskData.fio = item.fio
                this.newTaskData.id = item.id
                // при получении item, заполняются поля newTaskData (telnum, faculty, group, mail)
                this.newTaskData.telnum = '+7(999)868-76-22'
                this.newTaskData.faculty = 'Радиоэлектроника и лазерная техника'
                this.newTaskData.group = 'Группа 2'
                this.newTaskData.mail = 'vasya123@bk.ru'
            }
        },
        mounted() {
            if (!this.$route.params.type) this.$router.push({ name: 'home' })
            this.readOnly = this.$route.params.readOnly
            this.type = this.$route.params.type
            this.taskData = Object.assign(this.taskData, this.$route.params.taskData)

            if (!this.readOnly) {
                this.newTaskData.issueDate = new Date().getTime() // кол-во мс, прошедших с 01.01.1970 г. по UTC
            }
        }
    }
</script>

<style scoped lang="scss">
    .task {
        padding: 24px;
        background: var(--white);
        border-radius: var(--border-radius);
        &__desc {
            font-family: 'Exo 2';
            width: 75%;
            min-height: 50px;
            font-size: 16px;
        }
        &__info {
            display: grid;
            grid-template: auto / repeat(4, 1fr);
            grid-gap: 24px;
        }
        &__input {
            width: 100%;
            max-width: 300px;
        }
    }
    .autocomplete, .calendar {
        width: 100%;
        max-width: 400px;
    }

    .page-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .task-type {
        width: fit-content;
        padding: 8px 12px;
        border-radius: 24px;
        background: var(--primary);
        color: var(--white);
    }
    .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>
