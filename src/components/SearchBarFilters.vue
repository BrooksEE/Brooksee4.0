<script setup lang="ts">
    import { ref, watch, computed, onMounted, type Ref } from "vue";
    import { useDataStore } from '@/stores/data';
    import type { Option } from "@/types/options";
    import MagnifyingGlass from "./icons/MagnifyingGlass.vue";
    import { defineModel } from 'vue'

    defineEmits(['searchInFocus'])

    const dataStore = useDataStore()
    const entity = ref("")
    const host = ref("")
    const event = ref("")
    const search = defineModel<string>({ required: true })
    
    //TODO:
    /*
        - Search by name of entity, host, or event
        - Display associated entities, hosts, and events
        - When a search result is selected, select the entity, host, and event
    */
    // watch([search, entity, host, event], () => {

    // })

    watch(search, (newValue, oldValue) => {
        if(newValue.length === 0) {
            dataStore.turnOffSearchMode()
        }
    })

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            dataStore.setFilter(search.value)
        }
    }

    //TODO: Write the computed properties so that 
    // when the search is triggered, the entities, hosts, and events are filtered
    const entities = computed(() => {
        return []
    })
    const hosts = computed(() => {
        return []
    })
    const events = computed(() => {
        return []
    })

</script>
<template>
        <div class="search">
            <div class="text-search-container">
                <div class="magnifying-glass">
                    <MagnifyingGlass />
                </div>
                <input 
                    class="text-search" 
                    type="text" 
                    v-model="search" 
                    placeholder="SEARCH" 
                    @keydown.enter="handleKeyPress"
                    @focus="$emit('searchInFocus')"
                />
            </div>
    
            <div class="selects">
                <div class="select-container">
                    <select v-model="entity">
                        <option value="" disabled selected class="placeholder">Select an Entity</option>
                        <option v-for="item in entities" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </option>
                    </select>
                    <p class="select-label">ENTITY</p>
                </div>
        
                <div class="select-container">
                    <select v-model="host">
                        <option value="" disabled selected class="placeholder">Select a Host</option>
                        <option v-for="item in hosts" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </option>
                    </select>
                    <p class="select-label">HOST</p>
                </div>
        
                <div class="select-container">
                    <select v-model="event">
                        <option value="" disabled selected class="placeholder">Select an Event</option>
                        <option v-for="item in events" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </option>
                    </select>
                    <p class="select-label">EVENT</p>
                </div>
            </div>
        </div>
</template>
<style scoped>
    .search {
        background-color: white;
        border-radius: 30px;
        display: flex;
        padding: 10px 30px;
        width: max-content;
        border: 2px solid var(--light-gray-border-color);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 2;
    }
    .text-search-container {
        display: flex;
        align-items: center;
        position: relative;
    }
    .text-search:focus {
        outline: 1px solid var(--color2);
    }
    .magnifying-glass {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }
    .selects {
        display: flex;
        gap: 25px;
        margin-left: 25px;
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