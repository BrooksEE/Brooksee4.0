<script setup lang="ts">
    import { defineProps, ref } from 'vue';
    import { useSelectedItemStore } from '@/stores/selected';
    import { useDataStore } from '@/stores/data';
    import type { Event } from '@/types/event';
    import type { Entity } from '@/types/entity';
    import type { Host } from '@/types/host';
    import ChevronsRight from './icons/ChevronsRight.vue';

    defineEmits(['selected-item'])
    //TODO: define the actual types
    const props = defineProps<{
        data: {
            entity: Entity
            hosts: Host[]
            events: Event[]
        }
    }>()

    const { updateSelectedItem } = useSelectedItemStore()
    const { getHostFromId, getLatestEventFromHost } = useDataStore()
    function formatEventName(event: Event) {
        return `${ new Date(event.date).getFullYear() } - ${ event.name }`
    }

    function getEventHostName(event: Event){
        let host = getHostFromId(event.host_id)
        return host ? host.name : ''
    }

    function handleEventClick(event: Event){
        console.log("selected event:", event)
        let host = getHostFromId(event.host_id)
        console.log('host:', host)
        updateSelectedItem(props.data.entity, host, event)
    }

    function handleHostClick(host: Host){
        console.log('selected host:', host)
        const latestEvent = getLatestEventFromHost(host.id)
        updateSelectedItem(props.data.entity, host, latestEvent)
    }
</script>

<template>
    <div class="result-item">
        <div class="entity-container">
            <ChevronsRight class="chevrons"/>
            <p class="entity">{{ data.entity.name }}</p>
        </div>

        <div v-if="data.hosts.length > 0" class="hosts">
            <template v-for="(host, idx) in data.hosts" :key="idx">
                <p @click="handleHostClick(host)" class="host">
                    <span class="host-icon">🏢</span> {{ host.name }}
                </p>
            </template>
        </div>

        <div v-if="data.events.length > 0" class="events">
            <template v-for="(event, idx) in data.events" :key="idx">
                <p @click="handleEventClick(event)" class="event">
                    <div class="event-data">
                        <div>
                            <span class="event-icon">🏆</span> {{ formatEventName(event) }} 
                        </div>
                        <span class="event-host">Host: {{ getEventHostName(event) }}</span>
                    </div>
                </p>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .result-item {
        padding: 10px 15px;
        flex-direction: column;
        position: relative;
        margin-bottom: 10px;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border: 3px solid var(--color2);
        box-sizing: border-box;
    }
    .entity-container {
        display: flex;
        align-items: center;
    }
    .chevrons {
        width: 26px;
        height: 26px;
    }
    .entity {
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--primary-color);
    }

    .hosts, .events {
        padding-left: 15px;
        margin-top: 5px;
    }

    .host, .event {
        font-size: 0.95rem;
        color: var(--dark-gray-text);
        padding: 5px 0;
        transition: background-color 0.3s ease;
    }

    .host:hover, .event:hover {
        background-color: var(--gray-hover-bg);
    }

    .host-icon, .event-icon {
        margin-right: 8px;
        font-size: 1.1rem;
        color: var(--icon-color);
    }

    .host:hover .host-icon, .event:hover .event-icon {
        color: var(--primary-color);
    }
    .event-data{
        display: flex;
        flex-direction: column;
    }
    .event-host {
        font-style: italic;
        color: var(--light-gray-text);
    }
</style>
