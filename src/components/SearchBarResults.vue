<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useDataStore } from '@/stores/data';
    import SearchBarResultsSection from './SearchBarResultsSection.vue';
    import SearchResultItem from './SearchResultItem.vue';

    defineProps({
        searchData: Object
    })

    /* TODO: add an actual type for this in the types folder */
    interface SearchResult {
        entity: any;
        hosts: any[];
        events: any[];
    }
    
    let searchData = ref<SearchResult[]>([])
    
    /* TODO: 
        - [DONE] Decide on tiered display ( entities => hosts => events )
        - [DONE] Display search results
        - [DONE] Ensure Event displays with the year
        - When a search result is selected, select the entity, host, and event
        - Set up the event & host options when something is selected
    */
    const dataStore = useDataStore()
    const { loading } = storeToRefs(dataStore)

    watch(() => dataStore.filteredSearchData, (newValue, oldValue) => {
        console.log('filtered data:', newValue)
        searchData.value = newValue
    }, { deep: true, immediate: true })

</script>
<template>
    <SearchBarResultsSection :title="'Results'">
        <template #content>
            <div class="results">
                <!-- <p v-if="loading">Loading....</p> -->
                <!-- <template v-else> -->
                    <template v-if="searchData.length > 0">
                        <div class="search-results">
                            <SearchResultItem 
                                v-for="(data, idx) in searchData" 
                                :key="idx" 
                                :data="data" 
                            />
                        </div>
                    </template>
                    <p v-else-if="searchData.length === 0" class="no-match">
                        No results match this search....
                    </p>
                <!-- </template> -->
            </div>
        </template>
    </SearchBarResultsSection>
</template>
<style scoped>
    .results {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        overflow-y: auto;
        max-height: 50vh;
    }
    .results::-webkit-scrollbar {
        width: 8px;
    }

    .results::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
    }

    .results::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 14px;
    }
    .row {
        display: flex;
        flex-direction: column;
        position: relative;
        margin-bottom: 10px;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border: 2px solid var(--color2);
    }
    .values {
        gap: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }
    .column {
        display: flex;
        flex-direction: column;
    }
    .value {
        color: var(--color1);
        font-weight: bold;
    }
    .col-title {
        font-size: 12px;
        color: var(--color2);
        text-align: center;
    }
    .right {
        height: 40px;
        width: 40px;
        position: relative;
        left: 10px;
    }
    .no-match {
        padding-left: 10px;
    }
    @media(hover: hover){
        .row:hover {
            position: relative;
            top: -2px;
            transition: all 0.2s ease-in-out;
        }
    }
</style>