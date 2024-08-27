<template>
  <div class="relative">
    <main
      class="relative font-body bg-100-auto w-[99vw] overflow-x-hidden min-h-[100vh]"
      :style="mainStyle"
    >
      <section class="h-[100vh] w-[100vw] absolute top-0">
        <CanvasContainer ref="canvasContainer" />
        <div
          ref="transitionContainer"
          class="transition-all duration-700 w-[100vw] h-[88vh] bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
          :class="{
            'w-[82vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:h-[62vh] lg:max-w-[1300px]': isMode2,
            '!h-[100vh] !w-[100vw]': isMode3,
            '!hidden': isMode4

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
import CanvasContainer from '@/components/CanvasContainer.vue'
import SecondCanvasContainer from '@/components/SecondCanvasContainer.vue'


const route = useRoute()

const isMode2 = computed(() => route.path === '/projets/default')
const isMode3 = computed(() =>  /\/projets\/[{0-9}]+/.test(route.path))
const isMode4 = computed(() => route.path === "/who-i-am")

const transitionContainer = ref(null)

const mainStyle = computed(() => ({
  'background-image': isMode2.value || isMode3.value || isMode4.value ? 'url(/background-desktop.jpg)' : ''
}))

</script>

<style>
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
  transition: all 1.5s ease;
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
