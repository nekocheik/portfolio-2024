<template>
  <div class="relative">
    <main class="relative font-body bg-100-auto overflow-y-hidden" :style="mainStyle">
      <svg class="absolute">
        <filter id="wavyBackground">
          <feTurbulence
            id="turbulence1"
            type="turbulence"
            numOctaves="2"
            result="NOISE1"
          ></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="NOISE1" scale="100"></feDisplacementMap>
          <animate
            xlink:href="#turbulence1"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.2;1"
            values="0.01 0.02;0.02 0.01;0.04 0.02"
            repeatCount="indefinite"
          ></animate>
        </filter>
      </svg>

      <img
        :style="{
          filter: 'url(#wavyBackground)',
          transform: `translateY(${Math.round(windowTop / 1.5)}px)`
        }"
        src="/background-image.jpg"
        :class="{ 'opacity-100': isMode3 || isMode2 || isMode4 }"
        class="w-full absolute scale-110 transition-opacity duration-700 opacity-0"
        alt=""
      />
      <section class="h-[100vh] w-[100vw] absolute top-0">
        <CanvasContainer ref="canvasContainer" />
        <div
          ref="transitionContainer"
          class="transition-all duration-[1400ms] w-[100vw] h-[88vh] bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
          :class="{
            'w-[82vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:min-w-[1140px] lg:h-[64vh] lg:max-h-[600px] lg:max-w-[1200px]':
              isMode2,
            '!h-[100vh] !w-[100vw]': isMode3,
            'translate-x-[-100vw]': isMode4
          }"
        >
          <SecondCanvasContainer ref="secondCanvasContainer" />
        </div>
      </section>
      <div ref="view" class="min-w-[100%] max-w-[100vw] overflow-hidden min-h-[100vh] table">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import CanvasContainer from '@/components/CanvasContainer.vue'
import SecondCanvasContainer from '@/components/SecondCanvasContainer.vue'

const route = useRoute()
const view = ref<HTMLDivElement>()
const viewSize = ref(0)

const isMode2 = computed(() => route.path === '/projets/default')
const isMode3 = computed(() => /\/projets\/[{0-9}]+/.test(route.path))
const isMode4 = computed(() => route.path === '/who-i-am')
const windowTop = ref(0)

const transitionContainer = ref(null)

const mainStyle = computed(() => ({
  'background-image': isMode2.value || isMode3.value || isMode4.value ? '' : '',
  height: `${viewSize.value}px`
}))

const onScroll = () => {
  windowTop.value = window.top.scrollY
}

let invervalWatchClient: any

onMounted(() => {
  invervalWatchClient = setInterval(() => {
    if (view.value) {
      viewSize.value = view.value.clientHeight
    }
  }, 100)
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  clearInterval(invervalWatchClient)
  window.removeEventListener('scroll', onScroll)
})
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
