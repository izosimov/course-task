<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            linkParams: { type: String }
        }
    }
</script>
