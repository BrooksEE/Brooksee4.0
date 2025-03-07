<script setup lang="ts">
    import SidebarItemMenu from './SideBarItemMenu.vue'

    const props = defineProps<{
        icon: { component: any; label: string; menu?: any }
        isActive: boolean
    }>()

    const emit = defineEmits(['toggle'])

    const handleClick = () => {
        emit('toggle', props.icon.label)
    }
</script>

<template>
  <div class="sidebar-item" @click="handleClick" :class="{ active: isActive }">
    <component :is="icon.component" class="icon" />
    <p class="icon-label">{{ icon.label }}</p>
  </div>
  <Transition name="fade-slide">
    <SidebarItemMenu 
        v-if="isActive && icon.menu" 
        :menu="icon.menu" 
        @close="handleClick"
    />
  </Transition>
</template>

<style scoped>
    .fade-slide-enter-active, .fade-slide-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-slide-enter-from, .fade-slide-leave-to {
        opacity: 0;
        transform: translateX(-40px);
    }

    .fade-slide-enter-to, .fade-slide-leave-from {
        opacity: 1;
        transform: translateX(0);
    }
    .sidebar-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .icon {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon-label {
        color: white;
        text-align: center;
        font-size: 10px;
        font-weight: bold;
    }
    .sidebar-item:hover .icon-label, .sidebar-item.active .icon-label {
        color: var(--color2);
    }
    .sidebar-item:hover svg, .sidebar-item.active svg {
        stroke: var(--color2);
    }
</style>
