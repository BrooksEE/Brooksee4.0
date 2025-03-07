<script setup lang="ts">
    import { onMounted } from "vue";
    import { useDataStore } from "@/stores/data";
    import TheHeader from "@/components/TheHeader.vue";
    import TheSideBar from "@/components/TheSideBar.vue";

    const backend = useDataStore()

    onMounted(async () => {
        await backend.fetchData()
    })
</script>
<template>
    <TheHeader />
    <TheSideBar />
</template>
<style scoped>

</style>