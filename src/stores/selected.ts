import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedItemStore = defineStore('selected', () => {
    const selectedItem = ref({
        entity: '',
        host: '',
        event: ''
    })

    function updateSelectedItem(entity: string = "", host: string = "", event: string = "") {
        selectedItem.value = { entity, host, event }
    }    

    return {
        selectedItem,
        updateSelectedItem
    }
})
