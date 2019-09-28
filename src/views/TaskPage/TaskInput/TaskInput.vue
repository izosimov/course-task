<template>
    <div class="task-input">
        <p class="hint-text mb-8">{{ hint }}</p>
        <p>{{ value || '-' }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            hint: { type: String },
            value: { type: String }
        }
    }
</script>

<style scoped lang="scss">
    .task-input {
        width: 100%;
        max-width: 300px;
    }
</style>
