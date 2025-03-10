<script setup lang="ts">
    import type { Option } from '@/types/option'
    
    defineProps<{
        placeholder: string,
        items: Option[],
        label: string,
    }>()
    const model = defineModel<number>()
</script>
<template>
    <div class="select-container">
        <select v-model="model">
            <option value="" disabled class="placeholder">{{ placeholder }}</option>
            <option 
                v-for="item in items" 
                :key="item.value" 
                :value="item.value" 
                :title="item.label"
            >
                {{ item.label }}
            </option>
        </select>
        <p class="select-label">{{ label }}</p>
    </div>
</template>
<style scoped>
    .selects .select-container {
        max-width: 175px;
    }
    .select-container {
        display: flex;
        flex-direction: column;
    }
    .select-label {
        text-transform: uppercase;
        color: var(--color1);
        font-size: 0.7rem;
        font-weight: bold;
        margin-left: 4px;
    }
    select {
        border: none;
        outline: none;
        background-color: white;
        padding: 4px 8px 4px 0;
    }
</style>