import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Event } from '@/types/event';
import type { Entity } from '@/types/entity';
import type { Host } from '@/types/host';

export const useSelectedItemStore = defineStore('selected', () => {
    const selectedItem = ref<{ 
      entity: Entity
      host: Host
      event: Event
    }>({
      entity: {} as Entity,
      host: {} as Host,
      event: {} as Event
    })
    

    function updateSelectedItem(entity: Entity, host: Host, event: Event) {
        selectedItem.value = { entity, host, event }
    }    

    return {
        selectedItem,
        updateSelectedItem
    }
})
