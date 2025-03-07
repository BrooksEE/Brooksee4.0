import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

//TODO: Not sure what to name this yet....
export const useDataStore = defineStore('data', () => {
  const combinedOriginalData = ref<{ entity: any; hosts: any[]; events: any[] }[]>([])
  const filteredSearchData = ref<{ entity: any; hosts: any[]; events: any[] }[]>([])
  const searchFilter = ref('')
  const inSearchMode = ref(false)
  const loading = ref(false)

  // Fetch data from JSON file and populate combinedOriginalData
  const fetchData = async () => {
    try {
      const basePath = import.meta.env.BASE_URL;
      const response = await fetch(`${ basePath }Brooksee4.json`)
      const data = await response.json()
      combinedOriginalData.value = mergeData(data.entities, data.hosts, data.events)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Internal function to merge entities, hosts, and events
  function mergeData(entities: any[], hosts: any[], events: any[]) {
    const entityMap = new Map(entities.map(entity => [entity.id, entity]))
  
    // Create a map for hosts, associating them with their entities
    const hostMap = new Map(hosts.map(host => [host.id, { ...host, entity: entityMap.get(host.entity_id) }]))
  
    // Create a map for the result, where each key is an entity, and its value is an object with hosts and events
    const resultMap = new Map<number, { entity: any, hosts: any[], events: any[] }>()
  
    // Build the resultMap
    events.forEach(event => {
      const host = hostMap.get(event.host_id)
  
      if (host && host.entity) {
        // If the entity exists in resultMap, add the host and event, otherwise create a new entry
        const existingEntity = resultMap.get(host.entity.id)
        
        if (existingEntity) {
          existingEntity.hosts.push(host)
          existingEntity.events.push(event)
        } else {
          resultMap.set(host.entity.id, {
            entity: host.entity,
            hosts: [host],
            events: [event]
          })
        }
      }
    })
  
    return Array.from(resultMap.values())
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
    combinedOriginalData.value.forEach(item => {
      const matchingHosts = filterHosts(item.hosts, filter)
      const matchingEvents = filterEvents(item.events, filter)
      const hostsFromEvents = gatherHostsFromEvents(matchingEvents)

      const combinedHosts = [...matchingHosts, ...hostsFromEvents]
        .filter((host, index, self) => 
          index === self.findIndex(h => h.id === host.id) // Remove duplicates based on `id`
        )
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
    
      
      if (combinedHosts.length || matchingEvents.length) {
        filteredSearchData.value.push({ ...item, hosts: matchingHosts, events: matchingEvents })
      } else if (item.entity.name.toLowerCase().startsWith(filter)) {
        filteredSearchData.value.push({ ...item, hosts: [], events: [] })
      }
    })
    filteredSearchData.value.sort((a, b) => a.entity.name.localeCompare(b.entity.name))
    
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
  
  function filterHosts(hosts: any[], filter: string) {
    return hosts
      .filter((host, index, self) => self.findIndex(h => h.name.toLowerCase() === host.name.toLowerCase()) === index)
      .filter(host => host.name.toLowerCase().startsWith(filter))
      .sort((a, b) => a.name.localeCompare(b.name))
  }
  
  function filterEvents(events: any[], filter: string) {
    return events
      .filter(event => event.name.toLowerCase().startsWith(filter) || isMatchingYear(event.date, filter))
      .sort((a, b) => {
        const yearA = new Date(a.date).getFullYear()
        const yearB = new Date(b.date).getFullYear()
        if (yearA !== yearB) return yearB - yearA
        return a.name.localeCompare(b.name)
      })
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

  /*TODO: Add actual types for these in the types folder */
  interface Entity {
    id: number;
    name: string;
  }

  interface Host {
    id: string;
    name: string;
    entity_id: number;
    entity?: Entity;
  }

  interface Event {
    id: string;
    name: string;
    date: string;
    host_id: string;
  }

  interface CombinedData {
    entity: Entity;
    hosts: Host[];
    events: Event[];
  }

  function getHostFromId(hostId: string): Host {
    let test = combinedOriginalData.value
            .flatMap(data => data.hosts)
            .find(host => host.id === hostId)
    return test
  }

  return { 
    loading,
    filteredSearchData,
    inSearchMode,
    turnOffSearchMode,
    clearSearchResults,
    fetchData,
    setFilter,
    getHostFromId
  }
})
