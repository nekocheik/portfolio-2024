<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="lg:pt-40 h-[400vh] w-[100vw]" >
    <section class="text-white pt-50 sm:pt-80 lg:pt-32 px-6 sm:px-28">
      <h1 class="font-kiona text-2xl lg:text-[55px] leading-snug">
        How we build<br />
        the world<br />
        together.
      </h1>
      <div class="pl-2">
        <p class="pt-2"><strong>Réalisé en 2019</strong></p>
        <p class="pt-2"><strong>Role</strong> / Dev end & Front</p>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">Mise en context/</h2>
        <p class="w-[90%] lg:w-[800px] pt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio augue dapibus tincidunt enim
          praesent praesent odio. Cursus erat tristique quam aenean id netus enim ut pulvinar.
          Placerat hendrerit ullamcorper cursus viverra. Felis nisl elementum venenatis feugiat.
          Nulla fermentum, vitae faucibus facilisis molestie nulla volutpat quis sed.
        </p>
      </div>
      <div class="flex justify-center pt-36">
        <AButton class="mx-auto"> En voir plus </AButton>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">
          Techno<br />
          utilisée /
        </h2>
        <ul class="w-[90%] lg:w-[800px] pt-4 pl-6 list-disc">
          <li>Vue.js</li>
          <li>mongodb</li>
          <li>Node.js</li>
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
