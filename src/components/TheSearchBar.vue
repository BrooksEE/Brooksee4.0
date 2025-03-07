<script setup lang="ts">
    import { ref, watch } from "vue";
    import { useDataStore } from "@/stores/data";
    import SearchBarResultsDropdown from "./SearchBarResultsDropdown.vue";
    import SearchBarFilters from "./SearchBarFilters.vue";

    const dataStore = useDataStore()
    const showDropdown = ref(false)
    const searchQuery = ref('')

    const closeDropdown = () => {
        showDropdown.value = false
        dataStore.clearSearchResults()
        searchQuery.value = ""
    }
</script>
<template>
    <div class="search-container">
        <SearchBarFilters 
            @search-in-focus="showDropdown = true"
            v-model="searchQuery"
        />
        
        <transition name="slide">
            <SearchBarResultsDropdown 
                v-if="showDropdown"
                @close="closeDropdown"
            />
        </transition>
    </div>
</template>
<style scoped>
    .search-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
.slide-enter-to, .slide-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>