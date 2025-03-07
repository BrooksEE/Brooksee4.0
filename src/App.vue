<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { onMounted } from 'vue';

  //TODO: this is for testing purposes to make the app run
  const dataStore = useDataStore()
  onMounted(async () => {
    await dataStore.fetchData()
  })
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
