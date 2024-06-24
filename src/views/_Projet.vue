<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="lg:pt-40 h-[300vh] w-[100vw]">
    <section class="text-white pt-50 sm:pt-80 lg:pt-32 px-6 sm:px-28">
      <h1 class="font-kiona text-2xl lg:text-[55px] leading-snug">
        {{ project.title }}
      </h1>
      <div class="pl-2">
        <p class="pt-2"><strong>Réalisé en {{ project.year }}</strong></p>
        <p class="pt-2"><strong>Role</strong> / {{ project.role }}</p>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">Mise en context/</h2>
        <p class="w-[90%] lg:w-[800px] pt-4">
          {{ project.description }}
        </p>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">
          Techno<br />
          utilisée /
        </h2>
        <ul class="w-[90%] lg:w-[800px] pt-4 pl-6 list-disc">
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>

      <div>
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug pt-40">Galerie</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
          <div v-for="n in 6" :key="n" class="relative pb-[75%] overflow-hidden">
            <img
              :src="`https://picsum.photos/600/400?random=${n}`"
              class="absolute top-0 left-0 w-full h-full object-cover"
              alt="gallery image"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
