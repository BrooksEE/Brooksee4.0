<script setup lang="ts">
    defineProps<{
        //TODO: add typing for item
        item: any,
    }>()
</script>
<template>
    <Transition name="fade-slide">
        <div style="position: relative; left: 100px;">
            <div class="expanded-menu">
                    <router-link 
                        v-for="(subItem, subIdx) in item.subMenu" 
                        :key="subIdx" 
                        :to="subItem.route" 
                        class="sub-menu-item"
                    >
                        <span class="sidebar-menu-title">{{ subItem.label }}</span>
                    </router-link>
            </div>
        </div>
    </Transition>
</template>
<style scoped>
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
    .expanded-menu {
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
    .sub-menu-item .sidebar-menu-title {
        color: white !important;
    }
    .menu-item {
        padding: 4px 12px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    @media (hover: hover){
        .sub-menu-item:hover .sidebar-menu-title {
            color: var(--color2);
        }
    }
</style>