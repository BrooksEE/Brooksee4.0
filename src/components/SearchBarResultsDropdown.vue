<script setup lang="ts">
    import { watch } from 'vue';
    import { useDataStore } from '@/stores/data';
    import { storeToRefs } from 'pinia';
    import CloseX from './icons/X.vue';
    import SearchBarHelp from './SearchBarHelp.vue';
    import SearchBarResults from './SearchBarResults.vue';

    defineEmits(['close'])

    const dataStore = useDataStore()
    const { inSearchMode } = storeToRefs(dataStore)

    watch(() => dataStore.loading, (newValue, oldValue) => {
        console.log("loading new value:", newValue)
    })
</script>

<template>
    <div class="results-container">
        <div class="results">
            <div class="close">
                <CloseX @click="$emit('close')"/>
            </div>
            
            <SearchBarResults v-if="inSearchMode || dataStore.loading"/>
            <SearchBarHelp v-else />
        </div>
    </div>
</template>

<style scoped>
    .results-container {
        position: absolute;
        top: 8.5vh;
        width: 100%;
    }
    .close {
        position: absolute;
        stroke: var(--color1);
        right: 15px;
        top: 8px;
        width: 21px;
        height: 21px;
    }
    .results {
        position: relative;
        margin: auto;
        background-color: white;
        z-index: 1;
        border: 1px solid var(--light-gray-border-color);
        border-radius: 20px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1),  
            0px -2px 4px rgba(0, 0, 0, 0.05);
        padding: 10px 20px;
    }
    @media only screen and (max-width: 1180px) {
        .results-container {
            top: 14vh;
        }
    }
</style>