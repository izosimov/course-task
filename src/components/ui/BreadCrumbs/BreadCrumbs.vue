<template>
    <nav class="crumbs-navigation">
        <div v-for="(crumb, index) in crumbs" :key="crumb.label">
            <div v-if="index !== crumbs.length-1" class="crumbs-navigation__crumb-wap">
                <router-link tag="a" :to="{ name: crumb.linkTo }" class="crumbs-navigation__crumb mr-8">
                    {{ crumb.label }}
                </router-link>
                <div class="arrow arrow_right mr-8"></div>
            </div>
            <p v-else class="crumbs-navigation__crumb crumbs-navigation__crumb_current">{{ crumb.label }}</p>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                crumbs: null
            };
        },
        mounted() {
            this.crumbs = this.$route.meta.crumbs;
        }
    };
</script>

<style scoped lang="scss">
    .crumbs-navigation {
        display: flex;
        &__crumb-wap {
            display: flex;
            align-items: center;
        }
        &__crumb {
            font-size: 14px;
            text-decoration: none;
            color: var(--blue);
            &_current {
                color: var(--info);
            }
        }
    }
</style>
