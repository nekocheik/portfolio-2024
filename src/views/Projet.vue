<script setup lang="ts">
import { defineProps } from 'vue'
import Picture from '../components/galerie/Picture.vue'
import GalerieImages from "@/components/projet/GalerieImages.vue";

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
  <svg
    viewBox="0 0 1400 1400"
    width="1400"
    height="1400"
    aria-hidden="true"
    style="position: absolute; width: 0; height: 0; visibility: hidden"
  >
    <defs>
      <filter
        id="nnnoise-filter-img"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="linearRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.144"
          numOctaves="4"
          seed="15"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence"
        ></feTurbulence>
        <feSpecularLighting
          surfaceScale="15"
          specularConstant="0.75"
          specularExponent="20"
          lighting-color="#7957A8"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="turbulence"
          result="specularLighting"
        >
          <feDistantLight azimuth="3" elevation="100"></feDistantLight>
        </feSpecularLighting>
      </filter>
    </defs>
    <rect width="700" height="700" fill="transparent"></rect>
    <rect width="700" height="700" fill="#7957a8" filter="url(#nnnoise-filter-img)"></rect>
  </svg>

  <div class="lg:pt-40">
    <div
      class="h-[300px] w-[100vw] top-0 absolute"
      style="
        background: linear-gradient(
          rgb(0 0 0 / 98%) 0%,
          rgb(0 0 0 / 80%) 43%,
          rgba(255, 255, 255, 0) 100%
        );
      "
    ></div>
    <section class="text-white pt-50 sm:pt-80 lg:pt-32 px-6 sm:px-28">
      <h1 class="font-kiona text-2xl lg:text-[55px] leading-snug">
        {{ project.title }}
      </h1>
      <div class="pl-2">
        <p class="pt-2 lg:text-[66px]">
          <strong>{{ project.year }}</strong>
        </p>
        <p class="pt-2 text-2xl">/ {{ project.role }}</p>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">
          <span class="text-tertiary">Mise</span> <span class="text-primary-ligh">en</span> contexte
          /
        </h2>
        <div class="w-[90%] flex">
          <p class="lg:max-w-[770px] pt-4 lg:text-base" v-html="project.bigDescription" />
          <div class="relative">
            <div
              :duration="1200"
              v-motion-fade
              style="filter: url(#wavyGenerique)"
              class="w-[380px] h-[380px] 2xl:w-[500px] 2xl:h-[500px] bg-primary-medium absolute rounded-full top-[-100px] left-[280px]"
            ></div>
            <img
              class="hidden lg:block absolute min-w-[837px] min-h-fit left-36"
              :src="project.computerImg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="pt-16">
        <h2 class="font-kiona text-2xl lg:text-[40px] leading-snug">
          Techno<br />
          <span class="text-primary">utilisées /</span>
        </h2>
        <ul class="w-[90%] pt-4 pl-6 list-disc lg:text-2xl flex justify-around lg:pt-20">
          <li class="py-4 flex flex-col" v-for="tech in project.technologies" :key="tech">
            <div class="relative pb-8">
              <img
                class="h-14 absolute left-[50%] translate-x-[-50%] mx-auto min-w-[160px]"
                style="filter: grayscale(100%)"
                :src="tech.img"
                :alt="tech.name"
              />
            </div>
            <p class="text-center pt-14">{{ tech.name }}</p>
          </li>
        </ul>
      </div>

      <div class="flex justify-center pt-24">
        <AButton v-mouse @click="openLink(project.link)">Voir le site</AButton>
      </div>

      <div>
        <div
          v-if="project.viewMode === 'galerie-white-text'"
          v-for="(n, x) in project.medias"
          :key="n"
          class="relative pb-32"
        >
          <Picture
            :direction="x % 2 == 0 ? 'row' : 'row-reverse'"
            :text="n.text"
            :title="n.title"
            :img="n.img"
            :video="n.video"
          ></Picture>
        </div>
        <div class="lg:pt-32" v-if="project.viewMode === 'galerie-images'">
          <section class="flex flex-col items-center">
            <div
              v-for="media in project.medias"
              class="flex flex-col w-full items-center lg:py-2 lg:max-w-[80%]"
            >
              <div class="w-full"> <h2 class="pb-20 lg:text-[66px] uppercase font-thin">{{ media.title }}</h2> </div>
              <!-- hover:bg-[#0600005c] transition-colors -->
               <GalerieImages :img="media.img" />
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@keyframes squiggly-anim {
  0% {
    -webkit-filter: url('#squiggly-0');
    filter: url('#squiggly-0');
  }
  25% {
    -webkit-filter: url('#squiggly-1');
    filter: url('#squiggly-1');
  }
  50% {
    -webkit-filter: url('#squiggly-2');
    filter: url('#squiggly-2');
  }
  75% {
    -webkit-filter: url('#squiggly-3');
    filter: url('#squiggly-3');
  }
  100% {
    -webkit-filter: url('#squiggly-4');
    filter: url('#squiggly-4');
  }
}

.test-anim {
  animation: 3s linear 0.1s infinite running squiggly-anim;
}
</style>
