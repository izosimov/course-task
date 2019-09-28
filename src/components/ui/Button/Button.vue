<template>
    <button @click="click" :class="buttonStyles" :style="{ width: `${width}px` }">
        <span v-if="!lockLoad && $slots.default" class="mr-8">
            <slot></slot>
        </span>
        <span v-if="label && !lockLoad" class="button__label">{{ label }}</span>
    </button>
</template>

<script>
    export default {
        props: {
            label: { type: String },
            isPlain: { type: Boolean, default: false },
            type: { type: String, default: 'simple' }, // primary / info / success / reject / simple
            icon: { type: Function },
            width: { type: [ String, Number ] },
            lock: { type: Boolean, default: false },
            lockLoad: { type: Boolean, default: false }
        },
        computed: {
            buttonStyles() {
                const styles = { 'button': true, 'button_lock': this.lock, 'button_lock-load': this.lockLoad }
                styles[`button_${this.type}`] = true
                return styles
            }
        },
        methods: {
            click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped lang="scss">
    .button {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        border: 2px solid;
        border-radius: var(--border-radius);
        font-weight: 700;
        transition: var(--hover-transition);
        &_primary {
            color:var(--white);
            background: var(--primary);
            border-color: var(--primary);

            &:hover {
                border-color: var(--primary-hover);
                background: var(--primary-hover);
                color: var(--white);
                transition: var(--hover-transition);
            }
        }
        &_info {
            transition: var(--hover-transition);
            border-color: var(--grey);
            color: var(--primary);
            &:hover {
                border-color: var(--primary);
                background: var(--primary);
                color: var(--white);
                transition: var(--hover-transition);
            }
        }
        &_success {
            transition: var(--hover-transition);
            background: var(--cucumber);
            border-color: var(--cucumber);
            color: var(--white);
            &:hover {
                border-color: var(--cucumber-hover);
                background: var(--cucumber-hover);
                transition: var(--hover-transition);
            }
        }
        &_reject {
            transition: var(--hover-transition);
            border-color: var(--grey);
            background: var(--softgrey);
            color: var(--primary);
            &:hover {
                border-color: var(--primary);
                background: var(--primary);
                color: var(--white);
                transition: var(--hover-transition);
            }
        }
        &_simple {
            background: var(--softgrey);
            border-color: var(--grey);
            color: var(--black);
            transition: var(--hover-transition);
            &:hover {
                border-color: var(--primary);
                background: var(--primary);
                color: var(--white);
                transition: var(--hover-transition);
            }
        }
        &_lock {
            color:var(--grey1);
            border-color: var(--grey);
            background: var(--lightgrey);
            pointer-events: none;
            &:hover {
                color:var(--grey1);
                border-color: var(--grey);
                background: var(--lightgrey);
            }
        }
        &_lock-load {
            position: relative;
            color:var(--grey1);
            border-color: var(--grey);
            background: var(--lightgrey);
            pointer-events: none;
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 15px;
                height: 15px;
                border: 5px solid;
                border-radius: 100%;
                border-color: transparent var(--grey) transparent var(--grey);
                animation: rotation 1.2s linear infinite;
            }
            &:hover {
                color:var(--grey1);
                border-color: var(--grey);
                background: var(--lightgrey);
            }
        }
    }
</style>
