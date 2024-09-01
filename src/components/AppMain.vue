<template>
  <div class="relative">
    <main
      class="relative font-body bg-100-auto overflow-y-hidden max-w-[100vw] overflow-hidden cursor-none"
      :style="mainStyle"
    >
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
      <ScrollView root :duration="1.4">
        <div ref="view" class="min-w-[100%] max-w-[100vw] overflow-hidden min-h-[100vh] table">
          <section class="hidden lg:block">
            <div :class="{ 'w-[90px] h-[90px]': mouse.isHover }" class="cursor z-[1000]"></div>
            <div class="cursor2 z-[1000]"></div>
          </section>
          <ScrollComponent :speed="0.1">
            <RouterView />
          </ScrollComponent>
        </div>
      </ScrollView>
    </main>
  </div>
</template>

<script setup lang="ts">
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

  var cursor = document.querySelector('.cursor')
  var cursorinner = document.querySelector('.cursor2')
  var a = document.querySelectorAll('a')

  document.addEventListener('mousemove', function (e) {
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    cursorinner.style.left = e.clientX + 'px'
    cursorinner.style.top = e.clientY + 'px'
  })

  document.addEventListener('mousedown', function () {
    cursor.classList.add('click')
    cursorinner.classList.add('cursorinnerhover')
  })

  document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
  })

  a.forEach((item) => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover')
    })
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover')
    })
  })
})

onUnmounted(() => {
  clearInterval(checkCursorInterval)
  clearInterval(invervalWatchClient)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
.cursor {
  width: 68px;
  height: 68px;
  border-radius: 100%;
  border: 1px solid rgba(253, 235, 206, 0.748);
  transition: all 200ms ease-out;
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
