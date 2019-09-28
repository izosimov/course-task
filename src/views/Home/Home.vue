<template>
    <main class="page">
        <div class="mb-40">
            <p class="text-style">
                Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
                Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.
            </p>
        </div>
        <article>
            <el-tabs v-model="activeTab" @tab-click="onTabClickandler">
                <el-tab-pane label="Лабы" name="labs" class="tab-opener">
                    <TaskTable :tableData="tableDataLabs" type="labs"/>
                </el-tab-pane>
                <el-tab-pane label="Курсовые" name="courses" class="tab-opener">
                    <TaskTable :tableData="tableDataCourses" type="courses"/>
                </el-tab-pane>
            </el-tabs>
        </article>
    </main>
</template>

<script>
    import TaskTable from '@/views/Home/TaskTable/TaskTable'
    import { mapActions } from 'vuex'
    export default {
        components: {
            TaskTable
        },
        data() {
            return {
                activeTab: 'labs',
                tableDataLabs: [
                    {
                        fio: 'Иванов Вася',
                        telnum: '8(499)999-99-99',
                        faculty: 'tech',
                        group: 'best',
                        mail: 'mail',
                        title: 'title',
                        discipline: 'kek',
                        description: 'bhdsbdsb',
                        issueDate: '24.09.2019',
                        thesisDate: '23.10.3999',
                        completed: true,
                    }
                ],
                tableDataCourses: [
                    {
                        fio: 'Иванов Вася',
                        telnum: '8(499)999-99-99',
                        faculty: 'tech',
                        group: 'best',
                        mail: 'mail',
                        title: 'title',
                        discipline: 'kek',
                        description: 'bhdsbdsb',
                        issueDate: '24.09.2019',
                        thesisDate: '23.10.3999',
                        completed: true,
                    }
                ]
            }
        },
        methods: {
            ...mapActions('tasks', ['GET_TASKS']),
            onTabClickandler() {

            }
        },
        async mounted() {
            // запрашиваем лабы и курсовые, формируем таблицы на странице
            try {
                // const [ labs, courses ] = await Promise.all([
                //     this.GET_TASKS({ taskType: 'labs' }),
                //     this.GET_TASKS({ taskType: 'courses' })
                // ])
                // this.tableDataLabs = labs
                // this.tableDataCourses = courses
            } catch (err) {
                // this.$notify.error({
                //     title: 'Ошибка!',
                //     message: 'Что-то пошло не так'
                // })
            }
        }
    }
</script>

<style lang="scss">
    .tab-opener {
        animation: animate .7s ease-in-out;
    }
    @keyframes animate {
        from {
            opacity: 0;
        } to {
            opacity: 1;
        }
    }
</style>
