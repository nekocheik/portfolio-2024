<template>
  <header>
    <div class="back-button fixed top-10 left-10 z-50 cursor-pointer" @click="goBack">
      <svg class="back-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-ring__circle"
                stroke="white"
                stroke-width="2"
                fill="transparent"
                r="10"
                cx="12"
                cy="12"/>
        <path d="M14 18l-6-6 6-6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <nav class="hidden lg:flex fixed top-10 right-20 z-[100] w-96 justify-around">
      <NavigationButton
        label="home"
        routeName="home"
        :isActive="isCurrentRoute('home')"
        @navigate="navigateTo"
      />
      <NavigationButton
        label="Projets"
        routeName="projets"
        :isActive="isCurrentRoute('projets')"
        @navigate="router.push({ name: 'projets', params: { id: 'default' } })"
      />
      <NavigationButton
        label="Who I Am"
        routeName="whoiam"
        :isActive="isCurrentRoute('whoiam')"
        @navigate="navigateTo"
      />
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
  progress.value = scrollY / scrollTotal * 100
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
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 100%;
  height: 100%;
}

.progress-ring__circle {
  transition: stroke-dasharray 0.3s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
