<template>
  <div class="relative">
    <main
      class="relative font-body bg-100-auto overflow-y-hidden max-w-[100vw] overflow-hidden cursor-none"
      :style="mainStyle"
    >
      <svg v-if="!isSafari()" class="absolute">
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
        class="hidden sm:block w-full absolute scale-110 transition-opacity duration-700 opacity-0"
        alt=""
      />
      <section class="h-[100vh] w-[100vw] absolute top-0">
        <CanvasContainer v-if="!isSafari()" ref="canvasContainer" />
        <div
          ref="transitionContainer"
          class="transition-all duration-[1400ms] w-[100vw] h-[88vh] bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
          :class="{
            'w-[82vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:w-[90vw] lg:h-[64vh] lg:max-h-[600px] lg:max-w-[1200px] 2xl:max-w-[1400px]':
              isMode2,
            '!h-[100vh] !w-[100vw]': isMode3,
            'translate-x-[-100vw]': isMode4
          }"
        >
          <SecondCanvasContainer ref="secondCanvasContainer" />
        </div>
      </section>
      <section class="hidden lg:block">
        <div
          :style="{
            transform: `translate3d(calc(${cursor.x}px - 50%), calc(${cursor.y}px - 50%), 0)`,
            borderColor: cursor.isHovering
              ? 'rgba(253, 235, 206, 0.9)'
              : 'rgba(253, 235, 206, 0.748)',
            transition: isSafari() ? 'none' : 'transform 200ms ease-out',
            width: cursor.isHovering ? '90px' : '68px',
            height: cursor.isHovering ? '90px' : '68px'
          }"
          class="cursor z-[1000]"
        ></div>
        <div
          :style="{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            backgroundColor: cursor.isClicking ? 'rgba(255, 180, 206, 0.7)' : 'rgb(206, 180, 255)'
          }"
          class="cursor2 z-[1000]"
        ></div>
      </section>
      <ScrollView root :duration="1.4">
        <div ref="view" class="min-w-[100%] max-w-[100vw] overflow-hidden min-h-[100vh] table">
          <ScrollComponent :speed="0.1">
            <RouterView />
          </ScrollComponent>
        </div>
      </ScrollView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CanvasContainer from '@/components/CanvasContainer.vue'
import SecondCanvasContainer from '@/components/SecondCanvasContainer.vue'
import { ScrollView, ScrollComponent } from 'potiah'
import useMouse from '@/store/mouse.ts'

const route = useRoute()
const view = ref<HTMLDivElement>()
const viewSize = ref(0)
const mouse = useMouse()

const isMode2 = computed(() => route.path === '/projets/default')
const isMode3 = computed(() => /\/projets\/[{0-9}]+/.test(route.path))
const isMode4 = computed(() => route.path === '/who-i-am')
const windowTop = ref(0)

const cursor = reactive({
  x: 0,
  y: 0,
  isClicking: false,
  isHovering: false
})

const updateCursorPosition = (e: MouseEvent) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
}

const setClicking = (isClicking: boolean) => {
  cursor.isClicking = isClicking
}

const setHovering = (isHovering: boolean) => {
  cursor.isHovering = isHovering
}

const isSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return (
    userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('android')
  )
}

const mainStyle = computed(() => {
  let backgroundImage = ''
  if (isMode2.value || isMode3.value || isMode4.value) {
    backgroundImage = '' // Ajoutez l'image de fond que vous souhaitez ici
  }
  return {
    backgroundImage,
    height: `${viewSize.value}px`
  }
})

const onScroll = () => {
  windowTop.value = window.scrollY
}

let intervalWatchClient: any

onMounted(() => {
  intervalWatchClient = setInterval(() => {
    if (view.value) {
      viewSize.value = view.value.clientHeight
    }
  }, 100)

  window.addEventListener('scroll', onScroll)
  document.addEventListener('mousemove', updateCursorPosition)
  document.addEventListener('mousedown', () => setClicking(true))
  document.addEventListener('mouseup', () => setClicking(false))

  const links = document.querySelectorAll('a')
  links.forEach((item) => {
    item.addEventListener('mouseover', () => setHovering(true))
    item.addEventListener('mouseleave', () => setHovering(false))
  })
})

onUnmounted(() => {
  clearInterval(intervalWatchClient)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('mousemove', updateCursorPosition)
  document.removeEventListener('mousedown', () => setClicking(true))
  document.removeEventListener('mouseup', () => setClicking(false))
})
</script>

<style>
.cursor {
  width: 68px;
  height: 68px;
  border-radius: 100%;
  border: 1px solid rgba(253, 235, 206, 0.748);
  transition: transform 200ms ease-out;
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  transform: translate(calc(-50% + 15px), -50%);
}

.cursor2 {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: rgb(206, 180, 255);
  opacity: 0.3;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.3s, height 0.3s, opacity 0.3s;
}

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
