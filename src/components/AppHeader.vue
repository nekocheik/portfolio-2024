<template>
  <header class="relative">
    <div
      class="hidden lg:block fixed w-screen h-24 bg-black top-0 z-[100]"
      style="
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(22, 0, 31, 0.3253676470588235) 49%,
          rgba(255, 255, 255, 0) 100%
        );
      "
    ></div>
    <!-- <div
      class="back-button fixed top-10 left-10 z-50"
      @click="router.push({ name: 'projets', params: { id: 'default' } })"
    >
      <div class="relative">
        <svg class="back-arrow absolute" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
          <circle
            class="progress-ring__circle"
            :stroke-dashoffset="circleOffset"
            stroke="white"
            stroke-width="1.5"
            fill="transparent"
            r="10"
            cx="12"
            cy="12"
          />
        </svg>
        <svg class="back-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 18l-6-6 6-6"
            stroke="white"
            stroke-width="1"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div> -->
    <div class="text-white fixed top-8 left-8 z-[200] text-xl">
      <button
        @click="router.push({ name: 'projets', params: { id: 'default' } })"
        v-if="$route.name == 'projets' && $route.params.id != 'default'"
        z-mouses
      >
        < Retour
      </button>
    </div>
    <img
      src="/white-logo-cheik-kone.svg"
      alt="logo"
      @click="router.push({ name: 'home' })"
      z-mouse
      class="fixed z-[200] w-40 top-8 left-0 right-0 mx-auto opacity-80 hover:opacity-100 transition-all"
    />
    <nav class="bottom-6 w-10/12 justify-around fixed flex sm:bottom-[initial] sm:top-10 lg:right-20 z-[100] lg:w-4/12">
      <NavigationButton
        v-mouse
        :label="$t('nav.home')"
        routeName="home"
        :isActive="isCurrentRoute('home')"
        @navigate="navigateTo"
      />
      <NavigationButton
        v-mouse
        :label="$t('nav.projets')"
        routeName="projets"
        :isActive="isCurrentRoute('projets')"
        @navigate="router.push({ name: 'projets', params: { id: 'default' } })"
      />
      <NavigationButton
        v-mouse
        :label="$t('nav.who_i_am')"
        routeName="whoiam"
        :isActive="isCurrentRoute('whoiam')"
        @navigate="navigateTo"
      />
      <!-- <button
        class="language-button"
        @click="toggleLanguage"
      >
        {{ $t('nav.change_language') }}
      </button> -->
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavigationButton from './NavigationButton.vue'

const route = useRoute()
const router = useRouter()

const progress = ref(0)

const updateScrollProgress = () => {
  const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrollY = window.scrollY
  progress.value = (scrollY / scrollTotal) * 100
}

const toggleLanguage = () => {
  const currentLocal = localStorage.getItem('locale')
  window.log(currentLocal)
  const newVal = currentLocal == 'fr' ? 'en' : 'fr'
  localStorage.setItem('locale', newVal)
  location.reload()
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const isCurrentRoute = (routeName: string) => route.name === routeName
const navigateTo = (route: string) => router.push({ name: route })
</script>

<style scoped>
.back-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 100%;
  height: 100%;
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.3s; /* Smooth transition for the dash offset */
  stroke-dasharray: 62.8319; /* Circumference of the circle, C = 2πr, r = 10 */
}
</style>
