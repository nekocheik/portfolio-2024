<template>
  <div class="relative bg-black">
    <Modal />
    <div>
      <AppHeader v-if="$route.name != 'home'" />
    </div>
    <div :class="{ '!translate-x-0' : layerTransition.isVisible  }" class="w-[100vw] h-[100vh] bg-[#0c0411] fixed top-0 z-[100] transition-transform duration-1000 translate-x-[120vw]"></div>
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import Modal from './views/Modal.vue'
import useLayerTransition from '@/store/transitionLayer.ts'

const layerTransition = useLayerTransition()
</script>
