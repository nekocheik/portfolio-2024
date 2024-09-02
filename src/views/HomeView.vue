<template>
  <div class="z-50 relative top-20 mx-10 lg:mx-40 overflow-y-hidden max-h-[80vh]">
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
    <div class="">
      <section
        class="transition-generericAnimation duration-1000 opacity-100"
        :class="{ '-translate-y-[70vh] opacity-25': contactMode }"
      >
        <div class="font-display text-4xl tracking-[10px]">
          <Motion :preset="'slideVisibleLeft'" :duration="2000">
            <h1 class="font-bold pt-20 text-4xl lg:text-[50px] uppercase italic text text-tertiary">
              welcome !
            </h1>
          </Motion>
          <Motion :preset="'slideVisibleLeft'" :duration="2000" delay="1000">
            <h1 class="font-bold lg:pt-10 text-3xl lg:text-[60px] uppercase text text-primary">
              kone Cheik
            </h1>
          </Motion>
          <div
            class="lg:pt-32 pt-20 pb-20 transition-all duration-1000"
            :class="{ 'blur-[2px]': onTransition }"
          >
            <h1
              v-for="(text, index) in textAnimation"
              :class="{ 'opacity-100': currentIndexAnimation === index }"
              class="font-semibold lg:text-[98px] uppercase text-4xl text-white absolute opacity-0 transition-all duration-1000 onWaveAnimation"
            >
              {{ text }}
            </h1>
          </div>

          <h1
            class="font-[900] text-lg lg:text-[50px] uppercase text-white drop-shadow-[37 48.2px 52.2px rgba(0,0,0,0.8)]"
          >
            développeur
          </h1>
          <div class="text-2xl pt-16 lg:pt-18 text-white lg:text-lg">
            <a
              target="_blank"
              v-mouse
              class="font-bold"
              href="https://www.linkedin.com/in/cheik-kone/"
              >In</a
            >
            /
            <a target="_blank" v-mouse class="font-bold" href="https://github.com/nekocheik">Git</a>
          </div>
        </div>
        <div class="flex pt-8 lg:pt-20 justify-between w-60 lg:w-4/12 max-w-sm">
          <button
            class="text-white font-normal text-lg"
            v-mouse
            @click="router.push({ name: 'projets', params: { id: 'default' } })"
          >
            Projets
          </button>
          <button class="text-white font-normal text-lg" v-mouse @click="navigateTo('whoiam')">
            Qui je suis ?
          </button>
          <button class="text-white font-normal text-lg" v-mouse @click="contactMode = true">
            Contact
          </button>
        </div>
      </section>
      <div class="translate-y-[20vh]">
        <section
          :class="{ '-translate-y-[90vh]': contactMode, 'opacity-0': !contactMode }"
          class="text-white transition-generericAnimation duration-1000"
        >
          <div>
            <p
              class="pt-8 text-lg text-tertiary-light hover:text-white transition-colors lg:pt-32"
              @click="contactMode = false"
            >
              < <span v-mouse>Retour</span>
            </p>
          </div>
          <section class="text-white">
            <h2 class="lg:text-5xl font-bold font-kiona lg:pt-20">
              < Contactez-<span class="text-primary-ligh">moi</span> !!
            </h2>
            <p class="py-5">
              Pour toute question ou opportunité de collaboration, n'hésitez pas à me contacter :
            </p>
            <div class="contact-info lg:text-base leading-8">
              <p class="pt-4">
                Email:
                <a href="mailto:cheikkone49@gmail.com" class="text-primary lg:text-xl"
                  >cheikkone49@gmail.com</a
                >
              </p>
              <!-- <p>Téléphone: <a href="tel:+330603819428" class="text-primary">06 03 81 94 28</a></p> -->
              <div class="flex pt-10">
                <a @click="openLink('https://www.linkedin.com/in/cheik-kone')" class="pr-20">
                  <img src="/linkedin-logo.svg" alt="LinkedIn" />
                  LinkedIn
                </a>
                <a @click="openLink('https://github.com/nekocheik')">
                  <img src="/github-logo.svg" alt="GitHub" />
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
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
const contactMode = ref(false)

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


const openLink = (url) => {
  window.open(url)
}

</script>

<style lang="scss" scope>
.onWaveAnimation {
  filter: url(#wavy);
}
</style>
