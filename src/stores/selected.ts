import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Event } from '@/types/event';
import type { Entity } from '@/types/entity';
import type { Host } from '@/types/host';
import { useDataStore } from './data';

export const useSelectedItemStore = defineStore('selected', () => {
    const dataStore = useDataStore()

    const selectedItem = ref<{ 
      entity: Entity
      host: Host
      event: Event
    }>({
      entity: { id: -1, name: "" } as Entity,
      host: { id: -1, name: "" } as Host,
      event: { id: -1, full_name: "" } as Event
    })

    function updateSelectedItem(entity: Entity, host: Host = {} as Host, event: Event = {} as Event) {
      if(Object.keys(host).length === 0) {
        host = dataStore.getFirstAlphabeticalHostInEntity(entity.id)
      }

      if(Object.keys(event).length === 0){
        event = dataStore.getLatestEventFromHost(host.id)
      }

      selectedItem.value = { entity, host, event }
    }   

    return {
      selectedItem,
      updateSelectedItem
    }
})
