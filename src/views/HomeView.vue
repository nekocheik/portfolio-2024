<template>
  <div class="z-50 relative top-20 mx-10 lg:mx-40">
    <div class="font-display text-4xl tracking-[10px]">

      <h1 class="font-bold pt-20 text-xl lg:text-[88px] uppercase italic text text-tertiary">welcome !</h1>
      <h1 class="font-bold pt-20 text-xl lg:text-[88px] uppercase text text-primary">kone Cheik</h1>

      <h1 class="font-semibold lg:pt-56 lg:text-[60px] uppercase text-xl text-white">front-end && Back-end</h1>
      <h1
        class="font-[900] text-lg pt-10 lg:text-[60px] uppercase text-white drop-shadow-[37 48.2px 52.2px rgba(0,0,0,0.8)]">
        développeur</h1>
      <div class="text-2xl pt-16 lg:pt-32 text-white lg:text-lg">
        <a target="_blank" class="font-bold" href="https://www.linkedin.com/in/cheik-kone/">In</a> / <a target="_blank"
          class="font-bold" href="https://github.com/nekocheik">Git</a>
      </div>
    </div>
    <div class="flex pt-8 lg:pt-16 justify-between w-60">
      <button class="text-white font-normal text-lg" @click="navigateTo('projets')">Projets</button>
      <button class="text-white font-normal text-lg" @click="navigateTo('whoiam')">Who I Am</button>
      <button class="text-white font-normal text-lg" @click="navigateTo('contact')">Contact</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
  router.push({ name: route })
}
</script>
