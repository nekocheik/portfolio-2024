<template>
  <div class="relative">
    <Modal />
    <AppHeader v-if="$route.name != 'home'"/>
    <AppMain @click="open('ModalGalerie')" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import Modal from './views/Modal.vue'

import useModal from '@/composable/useModal';
const { open } = useModal();
</script>
