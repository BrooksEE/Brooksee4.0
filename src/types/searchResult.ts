import type { Entity } from '@/types/entity';
import type { Host } from '@/types/host';
import type { Event } from '@/types/event';

export interface SearchResult {
    entity: Entity;
    hosts: Host[];
    events: Event[];
}