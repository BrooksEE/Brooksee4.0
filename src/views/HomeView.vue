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
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <p style="margin: 0; padding: 0;">
            The search bar is working and a selected item will get added to the filters. 
            It is still very slow, but the idea is there.
            A few next steps off the top of my head:
            <ul style="padding-left: 30px;">
                <li>Fix selected item slowness</li>
                <li>Get the rest of the events to show for the selected host & event</li>
                <li>Fix the UI bug of the search bar stretching and shrinking</li>
            </ul>
        </p>
    </div>
</template>
<style scoped>

</style>