import { ref, watch, computed, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from '@/stores/data';
import { useSelectedItemStore } from '@/stores/selected';
import type { Option } from "@/types/option";

export function useSearch() {
    const dataStore = useDataStore()
    const selectedItemStore = useSelectedItemStore()
    const { updateSelectedItem } = selectedItemStore
    const { 
        getFilteredHostOptions, 
        getFilteredEntityOptions, 
        getFilteredEventOptions, 
        getEntityById,
        getEventById,
        getHostById,
        getEntityByName,
        getHostByName,
        getLatestEventFromHost
    } = dataStore

    const { selectedItem } = storeToRefs(selectedItemStore)
    const { initialDataLoaded } = storeToRefs(dataStore)

    const search = ref<string>("")
    const entities: Ref<Option[]> = ref([])
    const hosts: Ref<Option[]> = ref([])
    const events: Ref<Option[]> = ref([])

    const entityModel = computed({
        get: () => selectedItem.value.entity.id,
        set: (value) => {
            let entity = getEntityById(value)
            updateSelectedItem(entity)
        }
    })

    const hostModel = computed({
        get: () => selectedItem.value.host.id,
        set: (value) => {
            const host = getHostById(value)
            const entity = getEntityById(host.entity_id)
            updateSelectedItem(entity, host)
        }
    })

    const eventModel = computed({
        get: () => selectedItem.value.event.id,
        set: (value) => {
            const event = getEventById(value)
            const host = getHostById(event.host_id)
            const entity = getEntityById(host.entity_id)
            updateSelectedItem(entity, host, event)
        }
    })

    watch(selectedItem, (newValue, oldValue) => {
        if (newValue.entity !== oldValue.entity) {
            hosts.value = getFilteredHostOptions()
            events.value = getFilteredEventOptions()
        }
        if (newValue.host !== oldValue.host) {
            events.value = getFilteredEventOptions()
        }

        search.value = ""
    })

    watch(initialDataLoaded, (newValue) => {
        if (newValue) {
            entities.value = getFilteredEntityOptions()
            hosts.value = getFilteredHostOptions()
            events.value = getFilteredEventOptions()

            const entity = getEntityByName("Brooksee")
            const host = getHostByName("REVEL Big Cottonwood")
            const event = getLatestEventFromHost(host.id)
            updateSelectedItem(entity, host, event)
        }
    }, { once: true })

    watch(search, (newValue) => {
        if (newValue.length === 0) {
            dataStore.turnOffSearchMode()
        }
    })

    const setSearchQuery = () => {
        console.log('setting search query')
        dataStore.setFilter(search.value || "")
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            dataStore.setFilter(search.value || '')
        }
    }

    function clearSearchQuery(){
        search.value = ""
    }

    return {
        entities,
        entityModel,
        eventModel,
        events,
        hosts,
        hostModel,
        search,
        clearSearchQuery,
        handleKeyPress,
        setSearchQuery
    }
}
