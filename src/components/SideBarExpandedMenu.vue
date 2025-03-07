<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
    import ChevronsRight from '@/components/icons/ChevronsRight.vue';
    
    const props = defineProps<{ menu: any[] }>()
    const openMenus = ref<{ [key: string]: boolean }>({})
    const menuRef = ref<HTMLElement | null>(null)

    // Toggle submenu visibility
    const toggleSubMenu = (label: string) => {
        console.log("label:", label, openMenus.value[label])
        
        // Close all other submenus
        Object.keys(openMenus.value).forEach((key) => {
            if(key !== label){
                openMenus.value[key] = false
            }
        })

        openMenus.value[label] = !openMenus.value[label]
    }

    // Handle clicks outside the menu to close submenus
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
            openMenus.value = {} // Close all submenus
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
</script>
<template>
    <div ref="menuRef">
        <template v-for="(item, idx) in menu" :key="idx">
            <!-- Main Menu Item -->
            <div 
                v-if="item.subMenu" class="sidebar-menu-item" 
                :class="{active: openMenus[item.label]}" 
                @click.stop="toggleSubMenu(item.label)"
            >
                <span class="sidebar-menu-title">{{ item.label }}</span>

                <ChevronsRight :class="{ open: openMenus[item.label] }"/>

                <!-- Submenu (only shows if toggled open) -->

                <!--TODO: Pull out into a separate component-->
                <Transition name="fade-slide">
                    <div v-if="openMenus[item.label] && item.subMenu.length" class="expanded-menu">
                            <router-link 
                                v-for="(subItem, subIdx) in item.subMenu" 
                                :key="subIdx" 
                                :to="item.route" 
                                class="sub-menu-item"
                            >
                                <span class="sidebar-menu-title">{{ subItem.label }}</span>
                            </router-link>
                    </div>
                </Transition>
            </div>

            <!--TODO: Pull out into a separate component?-->
            <!-- Direct route link -->
            <router-link v-else-if="item.route" :to="item.route" class="sidebar-menu-item">
                <span class="sidebar-menu-title">{{ item.label }}</span>
            </router-link>
        </template>
    </div>
</template>
<style scoped>
    .sidebar-menu-item{
        position: relative; 
    }
    .sidebar-menu-item.active .sidebar-menu-title {
        color: var(--color2);
    }
    .expanded-menu {
        padding-left: 5px;
        padding: 0 10px;
        border-radius: 10px;
        background-color: var(--color1);
        margin-bottom: 10px;
        position: absolute;
        right: -200px;
        top: 0;
    }
    .expanded-menu .sidebar-menu-title {
        color: white;
        white-space: nowrap;
        font-weight: initial;
    }

    .sub-menu-item, .menu-item {
        padding: 4px 12px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sub-menu-item .sidebar-menu-title {
        color: white !important;
    }
    .fade-slide-enter-active, .fade-slide-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-slide-enter-from, .fade-slide-leave-to {
        opacity: 0;
        transform: translateX(-10px);
    }

    .fade-slide-enter-to, .fade-slide-leave-from {
        opacity: 1;
        transform: translateX(0);
    }

    @media (hover: hover){
        .sidebar-menu-item:hover .sidebar-menu-title, .sub-menu-item:hover .sidebar-menu-title {
            color: var(--color2);
        }
        .sidebar-menu-item:hover svg {
            stroke: var(--color2);
        }
    }
</style>