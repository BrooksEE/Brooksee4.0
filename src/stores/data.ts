import { ref, watch, type HydrationStrategy } from 'vue'
import { defineStore } from 'pinia'
import { useSelectedItemStore } from './selected'
import type { Host } from '@/types/host'
import type { Event } from '@/types/event'
import type { Entity } from '@/types/entity'

//TODO: Not sure what to name this yet....
export const useDataStore = defineStore('data', () => {
  const data = ref<{ entities: any[]; hosts: any[]; events: any[] }>({ entities: [], hosts: [], events: [] })
  const filteredSearchData = ref<{ entity: any; hosts: any[]; events: any[] }[]>([])
  const searchFilter = ref('')
  const inSearchMode = ref(false)
  const loading = ref(false)
  const initialDataLoaded = ref(false)
  const selectedItemStore = useSelectedItemStore()

  // Fetch data from JSON file and populate combinedOriginalData
  const fetchData = async () => {
    try {
      const basePath = import.meta.env.BASE_URL
      const response = await fetch(`${ basePath }Brooksee4.json`)
      data.value = await response.json()
      initialDataLoaded.value = true
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  function isMatchingYear(date: string, searchValue: string) {
    return new Date(date).getFullYear().toString().startsWith(searchValue)
  }

  const clearSearchResults = () => {
    filteredSearchData.value = []
    searchFilter.value = ""
  }

  function filterSearchResults(filter: string) {
    filteredSearchData.value = []

    // filteredSearchData will contain a list of entities, 
    // each with matching hosts and/or events based on the search value. 
    // If no hosts or events match, only the entity is included. 
    // Entities with no matches are excluded.

    filteredSearchData.value = data.value.entities
      .map(entity => {
        const matchingHosts = filterHosts(data.value.hosts, filter, entity.id)
        const matchingEvents = filterEvents(data.value.events, filter, entity.id)
    
        if (matchingHosts.length || matchingEvents.length) {
          return { entity, hosts: matchingHosts, events: matchingEvents }
        }
    
        if (entity.name.toLowerCase().startsWith(filter.toLowerCase())) {
          return { entity, hosts: [], events: [] }
        }
    
        return null // Exclude entities that don't match any filter
      })
      .filter((item): item is { entity: Entity; hosts: Host[]; events: Event[] } => item !== null)
      .sort((a, b) => a.entity.name.localeCompare(b.entity.name))
    console.log('filteredSearchData:', filteredSearchData.value)
    
    loading.value = false
  }

  function gatherHostsFromEvents(events: any[]){
    let hostsNotAlreadyInSearchResults = []

    for(let event of events){
      let host = getHostById(event.host_id)
      if(host){
        hostsNotAlreadyInSearchResults.push(host)
      }

    }
    return hostsNotAlreadyInSearchResults
  }

  function filterHosts(hosts: Host[], filter: string, entityId: number) {
    return hosts
            .filter(host => 
              host.entity_id === entityId &&
              host.name.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name))

  }
  
  function filterEvents(events: Event[], filter: string, entityId: number) {
    return events
            .filter(event => {
              const host = getHostById(event.host_id)
              return host?.entity_id === entityId 
                    && host.name.toLocaleLowerCase() !== "discard"
                    && event.full_name
                    && event.full_name.toLowerCase().includes(filter.toLowerCase())
            })  
            .sort((a, b) => b.full_name.localeCompare(a.full_name))
  }

  watch(searchFilter, (newValue, oldValue) => {
    console.log("searchFilter:", newValue)
    if(newValue !== oldValue){
      loading.value = true
      console.log("loading is true")
      filterSearchResults(newValue)
      loading.value = false
    }
  })

  function setFilter(filter: string){
    searchFilter.value = filter.trim()
    inSearchMode.value = true
  }

  const turnOffSearchMode = () => {
    inSearchMode.value  = false
  }

  function getHostById(hostId: number): Host {
    return data.value.hosts
            .find(host => host.id === hostId)
  }

  function getEventById(eventId: number): Event {
    return data.value.events
            .find(event => event.id === eventId)
  }

  function getEntityById(entityId: number): Entity {
    return data.value.entities
            .find(entity => entity.id === entityId)
  }

  function getEntityByName(name: string) {
    return data.value.entities
            .find(entity => entity.name === name)
  }

  function getHostByName(name: string) {
    return data.value.hosts
            .find(host => host.name === name)
  }

  function getFirstAlphabeticalHostInEntity(entityId: number) {
    const hosts = data.value.hosts
      .filter(host => host.entity_id === entityId)
      .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical sorting
    return hosts[0] || null // Return the first host or null if no hosts found
  }
  

  function getLatestEventFromHost(hostId: number): Event {
    return data.value.events
            .filter(event => event.host_id === hostId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || null
  }

  function getFilteredEntityOptions(){
    if(filteredSearchData.value.length){
      return filteredSearchData.value.map(item => item.entity)
    }

    return data.value.entities
            .map(entity => ({
              value: entity.id, 
              label: entity.name
            }))
            .sort((a,b) => a.label.localeCompare(b.label))
  }

  function getFilteredItems<T, K extends keyof { hosts: Host[]; events: Event[] }>(
    filteredData: typeof filteredSearchData.value, 
    originalData: T[], 
    key: K,
    valueKey: keyof T,
    labelKey: keyof T
  ): { value: string; label: string }[] {
    
    if (filteredData.length) {
      return filteredData.flatMap(item =>
        item[key]
          .map(subItem => ({
            value: subItem[valueKey] as string, 
            label: subItem[labelKey] as string
          }))
          .filter(item => item.label.trim() !== "")
      )
    }
    
    else if(selectedItemStore.selectedItem.entity.id !== -1){
      return filterByEntityOrHost(originalData, key)
      .map(item => ({
        value: item[valueKey] as string,
        label: item[labelKey] as string
      }))
      .filter(item => item.label.trim() !== "")
      .sort((a, b) => a.label.localeCompare(b.label))
    }

    return originalData
      .map(item => ({
        value: item[valueKey] as string,
        label: item[labelKey] as string
      }))
      .filter(item => item.label.trim() !== "")
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  function filterByEntityOrHost<T>(data: T[], key: string): T[] {
    if (key === "hosts") {
      let hosts = data.filter(item => (item as Host).entity_id === selectedItemStore.selectedItem.entity.id)
      return hosts
    }
    if (key === "events") {
      let events = data.filter(item => (item as Event).host_id === selectedItemStore.selectedItem.host.id)
      return events
    }

    return data
  }

  function getEventHostName(event: Event){
    let host = getHostById(event.host_id)
    return host ? host.name : ''
  }

  function formatEventName(event: Event) {
    return `${ event.full_name }`
  }
  
  const getFilteredHostOptions = () => getFilteredItems(filteredSearchData.value, data.value.hosts, "hosts", "id", "name")
  
  const getFilteredEventOptions = () => getFilteredItems(filteredSearchData.value, data.value.events, "events", "id", "full_name")

  return { 
    filteredSearchData,
    initialDataLoaded,
    inSearchMode,
    loading,
    clearSearchResults,
    fetchData,
    formatEventName,
    getEntityById,
    getEventById,
    getEventHostName,
    getEntityByName,
    getFilteredEntityOptions,
    getFilteredEventOptions,
    getFilteredHostOptions,
    getFirstAlphabeticalHostInEntity,
    getHostById,
    getHostByName,
    getLatestEventFromHost,
    setFilter,
    turnOffSearchMode
  }
})
