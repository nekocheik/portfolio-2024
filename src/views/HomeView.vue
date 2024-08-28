<template>
  <div class="z-50 relative top-20 mx-10 lg:mx-40">
    <svg class="absolute">
      <filter id="wavy">
        <feTurbulence
          id="turbulence"
          type="turbulence"
          numOctaves="10"
          result="NOISE"
        ></feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="NOISE"
          :scale="animationScale"
        ></feDisplacementMap>
        <animate
          xlink:href="#turbulence"
          attributeName="baseFrequency"
          dur="30s"
          keyTimes="0;0.2;1"
          values="0.01 0.02;0.02 0.01;0.04 0.02"
          repeatCount="indefinite"
        ></animate>
      </filter>
    </svg>

    <div class="font-display text-4xl tracking-[10px]">
      <Motion :preset="'slideVisibleLeft'" :duration="2000">
        <h1 class="font-bold pt-20 text-xl lg:text-[50px] uppercase italic text text-tertiary">
          welcome !
        </h1>
      </Motion>
      <Motion :preset="'slideVisibleLeft'" :duration="2000" delay="1000">
        <h1 class="font-bold pt-20 text-xl lg:text-[60px] uppercase text text-primary">
          kone Cheik
        </h1>
      </Motion>
      <div
        class="lg:pt-32 pb-20 transition-all duration-1000"
        :class="{ 'blur-[2px]': onTransition }"
      >
        <h1
          v-for="(text, index) in textAnimation"
          :class="{ 'opacity-100': currentIndexAnimation === index }"
          class="font-semibold lg:text-[70px] uppercase text-xl text-white absolute opacity-0 transition-all duration-1000 onWaveAnimation"
        >
          {{ text }}
        </h1>
      </div>

      <h1
        class="font-[900] text-lg pt-10 lg:text-[50px] uppercase text-white drop-shadow-[37 48.2px 52.2px rgba(0,0,0,0.8)]"
      >
        développeur
      </h1>
      <div class="text-2xl pt-16 lg:pt-18 text-white lg:text-lg">
        <a target="_blank" class="font-bold" href="https://www.linkedin.com/in/cheik-kone/">In</a> /
        <a target="_blank" class="font-bold" href="https://github.com/nekocheik">Git</a>
      </div>
    </div>
    <div class="flex pt-8 lg:pt-10 justify-between w-60">
      <button
        class="text-white font-normal text-lg"
        @click="router.push({ name: 'projets', params: { id: 'default' } })"
      >
        Projets
      </button>
      <button class="text-white font-normal text-lg" @click="navigateTo('whoiam')">Who I Am</button>
      <button class="text-white font-normal text-lg" @click="navigateTo('contact')">Contact</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const currentIndexAnimation = ref(0)
const onTransition = ref(false)
const textAnimation = ['front-end', 'back-end', 'creatif']

const animationScale = ref(0)

function startAnimationScale() {
  let animationOpen = true
  let animationClose = false
  let interval

  interval = setInterval(() => {
    if (animationOpen && !animationClose) {
      animationScale.value++
      if (animationScale.value >= 100) {
        animationClose = true
      }
    } else {
      animationScale.value--

      if (animationScale.value <= 0) {
        animationClose = false
        animationOpen = false
        clearInterval(interval)
      }
    }
  }, 10)
}
let intervalAnimation

onMounted(() => {
  intervalAnimation = setInterval(() => {
    startAnimationScale()
    onTransition.value = true
    setTimeout(() => {
      if (currentIndexAnimation.value < textAnimation.length - 1) {
        currentIndexAnimation.value++
      } else {
        currentIndexAnimation.value = 0
      }
      setTimeout(() => {
        onTransition.value = false
      }, 1300)
    }, 400)
  }, 2800)
})

onUnmounted(() => {
  clearInterval(intervalAnimation)
})

const navigateTo = (route) => {
  router.push({ name: route })
}
</script>

<style lang="scss" scope>
.onWaveAnimation {
  filter: url(#wavy);
}
</style>
