<script setup lang="ts">
import { defineProps } from 'vue'
import Picture from '../components/galerie/Picture.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const openLink = (url: string) => {
  window.open(url)
}
</script>

<template>
  <div class="lg:pt-40 h-[300vh] w-[100vw]">
    <div class="h-[300px] w-[100vw] top-0 absolute" style="background: linear-gradient(rgb(0 0 0 / 98%) 0%, rgb(0 0 0 / 80%) 43%, rgba(255, 255, 255, 0) 100%);">

    </div>
    <section class="text-white pt-50 sm:pt-80 lg:pt-32 px-6 sm:px-28">
      <h1 class="font-kiona text-2xl lg:text-[55px] leading-snug">
        {{ project.title }}
      </h1>
      <div class="pl-2">
        <p class="pt-2">
          <strong>Réalisé en {{ project.year }}</strong>
        </p>
        <p class="pt-2"><strong>Role</strong> / {{ project.role }}</p>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">Mise en context/</h2>
        <div class="w-[90%] lg:max-w-[1200px] pt-4 lg:text-lg" v-html="project.bigDescription" />
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">
          Techno<br />
          <span class="text-primary">utilisée /</span>
        </h2>
        <ul class="w-[90%] pt-4 pl-6 list-disc lg:text-2xl flex justify-around lg:pt-20">
          <li class="py-4 flex flex-col" v-for="tech in project.technologies" :key="tech">
            <img class="h-14" style="filter: grayscale(100%)" :src="tech.img" :alt="tech.name" />
            <p class="text-center pt-14">{{ tech.name }}</p>
          </li>
        </ul>
      </div>

      <div class="flex justify-center pt-24 cursor-pointer">
        <AButton @click="openLink(project.link)">Voir le site</AButton>
      </div>

      <div>
        <div v-for="(n, x) in project.medias" :key="n" class="relative pb-32">
          <Picture
            :direction="x % 2 == 0 ? 'row' : 'row-reverse'"
            :text="n.text"
            :title="n.title"
            :img="n.img"
            :video="n.video"
          ></Picture>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
