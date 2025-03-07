<script setup lang="ts">
    import { ref, watch, computed, type Ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useDataStore } from '@/stores/data';
    import { useSelectedItemStore } from '@/stores/selected';
    import { defineModel } from 'vue'
    import MagnifyingGlass from "./icons/MagnifyingGlass.vue";
    import type { Option } from "@/types/options";
    import type { Event } from '@/types/event';
    import type { Entity } from '@/types/entity';
    import type { Host } from '@/types/host';

    defineEmits(['searchInFocus'])

    const dataStore = useDataStore()
    const selectedItemStore = useSelectedItemStore()
    const { updateSelectedItem } = selectedItemStore
    const entity = ref("")
    const host = ref("")
    const event = ref("")
    const search = defineModel<string>({ required: true })
    const { selectedItem } = storeToRefs(selectedItemStore)
    
    //TODO:
    /*
        - Search by name of entity, host, or event
        - Display associated entities, hosts, and events
        - When a search result is selected, select the entity, host, and event
    */
    // watch([search, entity, host, event], () => {

    // })

    watch(selectedItem, (newValue) => {
        console.log('newValue:', newValue)

        // TODO: Update available options first -- this is a hack
        entities.value = [{ value: newValue.entity.id, label: newValue.entity.name }]
        hosts.value = [{ value: newValue.host.id, label: newValue.host.name }]
        events.value = [{ value: newValue.event.id, label: newValue.event.full_name }]

        // Then set the selected values
        entity.value = newValue.entity.id
        host.value = newValue.host.id
        event.value = newValue.event.id
    })

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
    // const entities = computed<Option[]>(() => {
    //     return []
    // })
    // const hosts = computed<Option[]>(() => {
    //     return []
    // })
    // const events = computed<Option[]>(() => {
    //     return []
    // })

    const entities: Ref<Option[]> = ref([])
    const hosts: Ref<Option[]> = ref([])
    const events: Ref<Option[]> = ref([])
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