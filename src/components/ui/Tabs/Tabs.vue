<template>
    <div class="tabs">
        <ul class="tabs__header">
            <li v-for="tab in tabItems" :key="tab.label"
                @click="onTabClickHandler(tab.label)"
                :class="[ 'tabs__tab', tab.label === activeSlotName ? 'tabs__tab_active' : '' ]">
                {{ tab.label }}
            </li>
        </ul>
        <transition name="out-left" tag="div">
            <slot :name="activeSlotName" />
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeSlotName: '',
                tabItems: [],
                // item: { label: String, linkParams: String, ...other } -- label from slot name --
            }
        },
        methods: {
            onTabClickHandler(newActiveSlotName) {
                this.activeSlotName = newActiveSlotName
                if (this.tabItems[this.activeSlotName].linkParams) {
                    if (this.$route.fullPath === this.tabItems[this.activeSlotName].linkParams) return
                    this.$router.replace({ path: this.tabItems[this.activeSlotName].linkParams })
                }
            }
        },
        mounted() {
            this.tabItems = Object.keys(this.$slots).reduce((res, slot) => {
                if (this.$slots[slot][0].componentOptions.propsData.linkParams === this.$route.path) {
                    this.activeSlotName = slot
                }
                res[slot] = {
                    label: slot,
                    linkParams: this.$slots[slot][0].componentOptions.propsData.linkParams
                }
                return res
            }, {})

            for (let tabName in this.tabItems) {
                if (this.tabItems[tabName].linkParams === this.$route.path) {
                    this.activeSlotName = this.tabItems[tabName].label
                }
            }
        }
    }
</script>

<style lang="scss">
    .tabs {
        &__header {
            display: flex;
        }
        &__tab {
            cursor: pointer;
            font-size: 18px;
            font-weight: 500;
            &:not(:last-child) {
                margin-right: 16px;
            }
            &_active {
                font-weight: 800;
            }
        }
    }
</style>
