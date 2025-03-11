<script setup lang="ts">
    import MagnifyingGlass from "./icons/MagnifyingGlass.vue";
    import SearchBarFilterSelect from "./SearchBarFilterSelect.vue";
    import { useSearch } from "@/composables/useSearch";

    defineEmits(['searchInFocus'])

    const { 
        search, 
        entities, 
        hosts, 
        events, 
        entityModel, 
        hostModel, 
        eventModel, 
        handleKeyPress,
        setSearchQuery,
    } = useSearch()
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