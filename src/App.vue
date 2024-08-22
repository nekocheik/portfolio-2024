<template>
  <div class="relative">
    <AppHeader v-if="$route.name != 'home'"/>
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
</script>
