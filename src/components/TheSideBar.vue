<script setup lang="ts">
import SidebarItem from './SideBarItem.vue'
import { ref } from 'vue'
import Calendar from './icons/Calendar.vue'
import DollarSignWithCircle from './icons/DollarSignWithCircle.vue'
import Megaphone from './icons/Megaphone.vue'
import Monitor from './icons/Monitor.vue'
import Stopwatch from './icons/Stopwatch.vue'
import Truck from './icons/Truck.vue'
import UserProfile from './icons/UserProfile.vue'

// Menu structure
const scoresSubMenu = [
    { label: "Participant Scores", route: "/" },
    { label: "Search Scores", route:"/" },
]

const statusSubMenu = [
    { label: "Tag Reads", route: "/" },
    { label: "Scores", subMenu: scoresSubMenu },
    { label: "Progress", route: "/" },
    { label: "Missing Reads", route: "/" },
    { label: "Stats", route: "/" },
    { label: "Wave Report", route: "/" },
    { label: "Iridium", route: "/" },
]

const timingMenu = [
    { label: "Setup", route: "/" },
    { label: "Participant", route: "/" },
    { label: "Status", subMenu: statusSubMenu },
    { label: "Forms", route: "/" },
    { label: "Import/Export", route: "/" },
    { label: "Media", route: "/" }
]

const topSectionIcons = [
  { component: Stopwatch, label: "Timing", menu: timingMenu },
  { component: Calendar, label: "Event Ops" },
  { component: Megaphone, label: "Engagement" },
  { component: Monitor, label: "Web & Media" },
  { component: Truck, label: "Logistics" },
  { component: DollarSignWithCircle, label: "Finance" }
]

const bottomSectionIcons = [{ component: UserProfile, label: "Profile" }]

// Track which menu is active
const activeMenu = ref<string | null>(null)

// Function to toggle the active menu
const toggleMenu = (label: string) => {
  activeMenu.value = activeMenu.value === label ? null : label
}
</script>

<template>
  <div class="sidebar">
    <div class="icons-section">
      <SidebarItem
        v-for="(icon, index) in topSectionIcons"
        :key="index"
        :icon="icon"
        :is-active="activeMenu === icon.label"
        @toggle="toggleMenu"
      />
    </div>

    <div class="icons-section">
      <SidebarItem
        v-for="(icon, index) in bottomSectionIcons"
        :key="index"
        :icon="icon"
        :is-active="activeMenu === icon.label"
        @toggle="toggleMenu"
      />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  margin: 10px 0px 10px 5px;
  width: 70px;
  border-radius: 40px;
  background: linear-gradient(135deg, var(--color1), var(--nav-dark-blue));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  height: calc(90vh - 20px);
  max-height: 100%;
}
.icons-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 20px;
}
</style>
