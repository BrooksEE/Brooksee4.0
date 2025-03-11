import { ref, watch } from 'vue'
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
    loading.value = true

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
    .filter((item): item is { entity: Entity; hosts: any[]; events: any[] } => item !== null)
    .sort((a, b) => a.entity.name.localeCompare(b.entity.name))
    console.log("filteredSearchData:", filteredSearchData)
    
    
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

  function filterHosts(hosts: any[], filter: string, entityId: number) {
    return hosts.filter(host => 
      host.entity_id === entityId &&
      host.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  
  function filterEvents(events: any[], filter: string, entityId: number) {
    return events.filter(event => 
      event.entity_id === entityId &&
      event.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  watch(searchFilter, (newValue, oldValue) => {
    if(newValue !== oldValue){
      filterSearchResults(newValue)
    }
  })

  function filterFromSelectOption(){

  }

  function setFilter(filter: string){
    searchFilter.value = filter.trim()
    inSearchMode.value = true
    console.log("search filter is set to:", searchFilter.value)
  }

  const turnOffSearchMode = () => {
    inSearchMode.value  = !inSearchMode.value
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
      console.log('here with key:', key)
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
    console.log("key:", key)
    if (key === "hosts") {
      console.log("entity id:", selectedItemStore.selectedItem.entity.id)
      let hosts = data.filter(item => (item as Host).entity_id === selectedItemStore.selectedItem.entity.id)
      console.log(`returning ${ key }:`, hosts)
      return hosts
    }
    if (key === "events") {
      console.log("host id:", selectedItemStore.selectedItem.host.id)
      let events = data.filter(item => (item as Event).host_id === selectedItemStore.selectedItem.host.id)
      console.log(`returning ${ key }:`, events)
      return events
    }

    return data
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
    getEntityById,
    getEventById,
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
