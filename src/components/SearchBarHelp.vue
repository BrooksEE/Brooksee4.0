<script setup lang="ts">
    import SearchBarResultsSection from './SearchBarResultsSection.vue';
    import SearchBarRecents from './SearchBarRecents.vue';
    import SearchBarFuture from './SearchBarFuture.vue';
    import SearchBarPast from './SearchBarPast.vue';
    const recents = [
        {
            src:"https://brookseeevents.s3.amazonaws.com/rag/2024/albums/Logo_Horizontal%20Orange_web.png",
            title: "Ragnar",
        }, 
        {
            src:"https://brookseeevents.s3.amazonaws.com/phx/2025/albums/PhoenixMarathonLogo_HorizontalStacked_Color1_web.png",
            title: "Phoenix Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/vrz/2025/albums/2025%20Zion%20Half%20Shield_web.png",
            title: "Zion Half"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/des/2022/albums/Deseret%20Marathon-03_web.png",
            title: "Deseret News Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/lvm/2024/albums/Final%20Logo-01_web.jpg",
            title: "Las Vegas Marathon"
        }
    ]
</script>

<template>
    <transition name="fade">
        <div>
            <SearchBarRecents />
            <SearchBarPast />
            <SearchBarFuture />
        </div>
    </transition>
</template>

<style scoped>

</style>