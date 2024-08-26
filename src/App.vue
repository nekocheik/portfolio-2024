<template>
  <div class="relative">
    <Modal />
    <AppHeader v-if="$route.name != 'home'"/>
    <AppMain  />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import Modal from './views/Modal.vue'
</script>
