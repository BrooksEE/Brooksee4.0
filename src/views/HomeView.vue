<script setup lang="ts">
    import { onBeforeMount } from "vue";
    import { useDataStore } from "@/stores/data";
    import TheHeader from "@/components/TheHeader.vue";
    import TheSideBar from "@/components/TheSideBar.vue";

    const dataStore = useDataStore()

    onBeforeMount(async () => {
        await dataStore.fetchData()
    })
</script>
<template>
    <TheHeader />
    <TheSideBar />
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <p style="margin: 0; padding: 0;">
            Next steps off the top of my head:
            <ul style="padding-left: 30px;">
                <li>Get the rest of the select options to show for the selected entity/host/event</li>
            </ul>
        </p>
    </div>
</template>
<style scoped>

</style>