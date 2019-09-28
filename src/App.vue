<template>
    <div id="app">
        <Header/>
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <Footer/>
    </div>
</template>
<script>
    import Header from '@/components/ui/Header/Header'
    import Footer from '@/components/ui/Footer/Footer'
    export default {
        components: {
            Header,
            Footer
        }
    }
</script>
<style lang="scss">

</style>
