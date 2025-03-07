<script setup lang="ts">
    import { ref } from 'vue';
    import SideBarExpandedMenu from './SideBarExpandedMenu.vue';
    import ChevronDown from './icons/ChevronDown.vue';
    import ChevronLeft from './icons/ChevronLeft.vue';

    const emits = defineEmits(['close'])
    const props = defineProps<{ menu: any[] }>()
    const openMenus = ref<{ [key: string]: boolean }>({})

    // Toggle submenu visibility
    const toggleSubMenu = (label: string) => {
        openMenus.value[label] = !openMenus.value[label]
    }
</script>

<template>
  <div class="sidebar-menu">
    <button class="close">
      <ChevronLeft @click="emits('close')"/>
    </button>

    <div v-for="(item, index) in menu" :key="index">
      <!--TODO: Pull out into a separate component?-->

      <!-- Nested submenu: Click expands inside the menu -->
      <div v-if="item.subMenu" class="sidebar-menu-item" @click="toggleSubMenu(item.label)">
        <span class="sidebar-menu-title">{{ item.label }}</span>
        <span class="sidebar-caret" :class="{ open: openMenus[item.label] }">
          <ChevronDown />
        </span>
      </div>
      
      <!--TODO: Pull out into a separate component?-->
      <Transition name="fade-slide">
        <div v-if="openMenus[item.label] && item.subMenu.length" class="nested-menu">
          <SideBarExpandedMenu :menu="item.subMenu" />
        </div>
      </Transition>

      <!--TODO: Pull out into a separate component?-->
      <!-- Direct link -->
      <router-link v-if="!item.subMenu && item.route" :to="item.route" class="sidebar-menu-item">
        <span class="sidebar-menu-title">{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>
<style>
  /* global styling */

  .sidebar-caret {
    transition: transform 0.3s ease;
    padding-top: 5px;
  }

  .sidebar-caret.open {
    transform: rotate(180deg);
  }

  .sidebar-menu-item{
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sidebar-menu-title {
    text-transform: uppercase;
    color: var(--color1);
  }
</style>

<style scoped>
    .close {
      position: absolute;
      right: -15px;
      top: -5px;
      background-color: var(--color2);
      border-radius: 50%;
      border: none;
      padding: 5px;
      cursor: pointer;
    }
    .sidebar-menu {
      position: absolute;
      left: 70px; /* Moves beside sidebar */
      top: calc(10vh + 20px); /* Aligns with top of sidebar */
      padding: 10px 15px 10px;
      min-width: 150px;
      border-right: 2px solid var(--light-gray-border-color);
      height: calc(90vh - 40px);
    }
    .nested-menu {
      padding-left: 15px;
      border-left: 1px solid rgba(255, 255, 255, 0.3);
      background-color: #f0f1f3;
      border-radius: 20px;
      position: relative;
    }
    .fade-slide-enter-active, .fade-slide-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-slide-enter-from, .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }

    .fade-slide-enter-to, .fade-slide-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    @media(hover: hover){
      .sidebar-menu-item:hover .sidebar-menu-title {
        color: var(--color2);
      }
      .sidebar-menu-item:hover .sidebar-caret svg {
        stroke: var(--color2);
      }
    }
</style>
