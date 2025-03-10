import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
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

  // Fetch data from JSON file and populate combinedOriginalData
  const fetchData = async () => {
    try {
      const basePath = import.meta.env.BASE_URL
      const response = await fetch(`${ basePath }Brooksee4.json`)
      data.value = await response.json()
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
      let host = getHostFromId(event.host_id)
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

  const setFilter = (filter: string) => {
    searchFilter.value = filter.trim()
    inSearchMode.value = true
    console.log("search filter is set to:", searchFilter.value)
  }

  const turnOffSearchMode = () => {
    inSearchMode.value  = !inSearchMode.value
  }

  function getHostFromId(hostId: string): Host {
    return data.value.hosts
            .find(host => host.id === hostId)
  }

  function getLatestEventFromHost(hostId: string): Event {
    return data.value.events
            .filter(event => event.host_id === hostId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || null
  }

  function getFilteredEntities(){
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

  function getFilteredItems<T>(
    filteredData: typeof filteredSearchData.value, 
    originalData: T[], 
    key: keyof { hosts: Host[]; events: Event[] },
    valueKey: keyof T,
    labelKey: keyof T
  ) {
    if (filteredData.length) {
      return filteredData.flatMap(item =>
        item[key].map(subItem => ({
          value: subItem[valueKey],
          label: subItem[labelKey]
        }))
      )
    }
  
    return originalData.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }))
  }
  
  const getFilteredHosts = () => getFilteredItems(filteredSearchData.value, data.value.hosts, "hosts", "id", "name")
  
  const getFilteredEvents = () => getFilteredItems(filteredSearchData.value, data.value.events, "events", "id", "name")
  

  return { 
    loading,
    filteredSearchData,
    inSearchMode,
    turnOffSearchMode,
    clearSearchResults,
    fetchData,
    setFilter,
    getHostFromId,
    getLatestEventFromHost
  }
})
