<template>
  <header>
    <nav class="hidden lg:flex fixed top-10 right-20 z-[100] w-96 justify-around">
      <NavigationButton 
        label="Projets" 
        routeName="projets" 
        :isActive="isCurrentRoute('projets')" 
        @navigate="navigateTo" 
      />
      <NavigationButton 
        label="Who I Am" 
        routeName="whoiam" 
        :isActive="isCurrentRoute('whoiam')" 
        @navigate="navigateTo" 
      />
      <NavigationButton 
        label="Contact" 
        routeName="contact" 
        :isActive="isCurrentRoute('contact')" 
        @navigate="navigateTo" 
      />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavigationButton from './NavigationButton.vue'

const route = useRoute()
const router = useRouter()

const isCurrentRoute = (routeName: string) => route.name === routeName
const navigateTo = (route: string) => router.push({ name: route })
</script>
