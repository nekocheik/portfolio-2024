<template>
  <div class="relative">
    <AppHeader />
    <main
      class="relative font-body bg-100-auto w-[99vw] overflow-x-hidden min-h-[100vh]"
      :style="mainStyle"
    >
      <section class="h-[100vh] w-[100vw] absolute top-0">
        <CanvasContainer ref="canvasContainer" />
        <div
          ref="transitionContainer"
          class="w-[100vw] h-[88vh] bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
          :class="{
            'w-[90vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:h-[70vh] transition-all': isMode2,
            '!h-[100vh] !w-[100vw]': isMode3
          }"
        >
          <SecondCanvasContainer ref="secondCanvasContainer" />
        </div>
      </section>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import AppHeader from '@/components/AppHeader.vue'
import CanvasContainer from '@/components/CanvasContainer.vue'
import SecondCanvasContainer from '@/components/SecondCanvasContainer.vue'

const route = useRoute()

const isMode2 = computed(() => route.path === '/projets/default')
const isMode3 = computed(() => route.path === '/projets/one')

const transitionContainer = ref(null)

const mainStyle = computed(() => ({
  'background-image': isMode2.value || isMode3.value ? 'url(/background-desktop.jpg)' : ''
}))

const animateTransition = () => {
  if (transitionContainer.value) {
    if (isMode2.value) {
      gsap.to(transitionContainer.value, { width: '1300px', height: '70vh', duration: 0.5 })
    } else if (isMode3.value) {
      gsap.to(transitionContainer.value, { width: '100vw', height: '100vh', duration: 1 })
    } else {
      gsap.to(transitionContainer.value, { width: '100vw', height: '88vh', duration: 1.3 })
    }
  }
}

watch([isMode2, isMode3], animateTransition)

onMounted(() => {
  animateTransition()
})
</script>

<style scoped>
.relative {
  position: relative;
}

.font-body {
  font-family: 'YourFontFamily', sans-serif;
}

.bg-100-auto {
  background-size: 100% auto;
}

.transition-container {
  width: 100vw;
  height: 88vh;
  background-color: black;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.5s ease;
}

.transition-container.mode2 {
  width: 90vw;
  height: 70vh;
  border-radius: 3xl;
}

.transition-container.mode3 {
  width: 100vw;
  height: 100vh;
}
</style>
