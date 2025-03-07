<script setup lang="ts">
    import { defineProps, computed } from 'vue';
    const props = defineProps({
        color: {
            type: String
        }
    })

    const strokeColor = computed(() => props.color || getComputedStyle(document.documentElement).getPropertyValue('--color1').trim() || 'black')

</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" class="close" width="21" height="21" viewBox="0 0 24 24" fill="none" :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
</template>
<style scoped>
    .close {
        cursor: pointer;
    }
</style>