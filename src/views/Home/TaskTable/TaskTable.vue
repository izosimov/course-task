<template>
    <div class="home">
        <div class="article">
            <div class="fl mb-24">
                <el-autocomplete
                     class="autocomplete mr-24" v-model="autocompleteValue" :trigger-on-focus="false"
                     :fetch-suggestions="querySearch" placeholder="Начните вводить" @select="handleSelect">
                     <i class="el-icon-search el-input__icon" slot="suffix"/>
                </el-autocomplete>
                <Button type="primary" :label="createBtnLabel" width="300" @click="createTask"/>
            </div>
            <el-table :data="tableData" @row-click="onTableClickHandler" empty-text="Нет данных">
                <el-table-column prop="title" label="Название"/>
                <el-table-column prop="fio" label="ФИО"/>
                <el-table-column prop="faculty" label="Факультет"/>
                <el-table-column prop="group" label="Группа"/>
                <el-table-column prop="discipline" label="Дисциплина"/>
                <el-table-column prop="thesisDate" label="Дедлайн"/>
                <el-table-column>
                    <template slot-scope="scope">
                        <Button @click="isShowPopup = true" label="Удалить"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="Хотите удалить задание" :visible.sync="isShowPopup" width="550px">
            <p>
                Вы уверены, что хотите удалить задание?
            </p>
            <div slot="footer" class="btn-footer">
                <Button type="reject" label="Отменить" width="150" class="mr-24" @click="isShowPopup = false"/>
                <Button type="primary"
                        label="Да, удалить" width="150" @click="approveDeleteTask"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Button from '@/components/ui/Button/Button'
    export default {
        components: {
            Button
        },
        props: {
            tableData: { type: Array },
            type: { type: String },
            deleteTask: { type: Function }
        },
        data() {
            return {
                isShowPopup: false,
                autocompleteValue: ''
            }
        },
        computed: {
            createBtnLabel() {
                switch (this.type) {
                    case 'labs':
                        return 'Создать лабораторную работу';
                    case 'courses':
                        return 'Создать курсовую работу';
                }
            }
        },
        methods: {
            approveDeleteTask() {
                // this.deleteTask()
                // функция из props удаления таска и переформирования tableData
                this.isShowPopup = false
            },
            createTask() {
                this.$router.push({
                    name: 'create-task',
                    params: {
                        readOnly: false,
                        taskData: {},
                        type: this.type
                    }
                })
            },
            onTableClickHandler(taskData, column) {
                if (!column.label) return
                this.$router.push({
                    name: 'create-task',
                    params: {
                        readOnly: true,
                        taskData: taskData,
                        type: this.type
                    }
                })
            },
            querySearch() {

            },
            handleSelect() {

            }
        }
    }
</script>

<style>
    .article {
        background: var(--white);
        padding: 24px;
    }
    .autocomplete {
        width: 100%;
        max-width: 400px;
    }
</style>
