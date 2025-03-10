<script setup lang="ts">
    import { ref, watch, computed, type Ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useDataStore } from '@/stores/data';
    import { useSelectedItemStore } from '@/stores/selected';
    import { defineModel } from 'vue';
    import MagnifyingGlass from "./icons/MagnifyingGlass.vue";
    import SearchBarFilterSelect from "./SearchBarFilterSelect.vue";
    import type { Option } from "@/types/option";

    defineEmits(['searchInFocus'])

    const dataStore = useDataStore()
    const selectedItemStore = useSelectedItemStore()
    const { updateSelectedItem } = selectedItemStore
    const { 
        getFilteredHostOptions, 
        getFilteredEntityOptions, 
        getFilteredEventOptions, 
        getEntityByName, 
        getEntityById,
        getEventById,
        getHostById,
        getHostByName,
        getLatestEventFromHost 
    } = dataStore
    const search = defineModel<string>()
    const { selectedItem } = storeToRefs(selectedItemStore)
    
    const entityModel = computed({
        get: () => selectedItem.value.entity.id,
        set: (value) => {
            let entity = getEntityById(value)
            console.log("entity:", entity)
        }
    })

    const hostModel = computed({
        get: () => selectedItem.value.host.id,
        set: (value) => {
            let host = getHostById(value)
            console.log("host:", host)
        }
    })

    const eventModel = computed({
        get: () => selectedItem.value.event.id,
        set: (value) => {
            let event = getEventById(value)
            console.log("host:", event)
        }
    })

    const entities: Ref<Option[]> = ref([])
    const hosts: Ref<Option[]> = ref([])
    const events: Ref<Option[]> = ref([])

    watch(() => dataStore.initialDataLoaded, (newValue, oldValue) => {
        if(newValue) {
            entities.value = getFilteredEntityOptions()
            hosts.value = getFilteredHostOptions()
            events.value = getFilteredEventOptions()

            const entity = getEntityByName("Brooksee")
            const host = getHostByName("REVEL Big Cottonwood")
            const event = getLatestEventFromHost(host.id)
            updateSelectedItem(entity, host, event)
        }
    }, { once: true })

    watch(selectedItem, (newValue, oldValue) => {
        if(newValue.entity !== oldValue.entity)  {
            //update associated hosts and events

        } else if( newValue.host !== oldValue.host) {
            //update associated events
        }
    })

    watch(search, (newValue, oldValue) => {
        if(newValue && newValue.length === 0) {
            dataStore.turnOffSearchMode()
        }
    })

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            dataStore.setFilter(search.value || '')
        }
    }
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
                <SearchBarFilterSelect
                    v-model="entityModel"
                    placeholder="Select an Entity"
                    :items="entities"
                    label="ENTITY"
                />

                <SearchBarFilterSelect
                    v-model="hostModel"
                    placeholder="Select a Host"
                    :items="hosts"
                    label="HOST"
                />

                <SearchBarFilterSelect
                    v-model="eventModel"
                    placeholder="Select an Event"
                    :items="events"
                    label="EVENT"
                />
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
        width: auto;
        max-width: 100%;
        min-width: 500px;
        justify-content: flex-start;
    }
    .text-search-container {
        display: flex;
        align-items: center;
        position: relative;
        flex-grow: 1; 
        min-width: 215px; 
    }
    .text-search {
        width: 100%;
        max-width: 215px;
        min-width: 200px;
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
        gap: 10px;
        margin-left: 25px;
        justify-content: flex-start;
        
    }
    @media only screen and (max-width: 1180px){
        .search {
            flex-direction: column;
            gap: 10px;
            width: 100%;
            min-width: 600px;
        }
        .text-search {
            max-width: 100%;
        }
        .selects {
            margin-left: 0;
        }
    }
    @media only screen and (max-width: 870px) {
        .search {
            min-width: 100%;
        }
    }
</style>