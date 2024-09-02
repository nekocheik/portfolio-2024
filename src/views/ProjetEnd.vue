<script setup lang="ts">
const { project, index } = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="relative">
    <section class="text-white pt-50 sm:pt-80 lg:pt-32 px-6 sm:px-28">
      <h1 class="font-kiona text-2xl lg:text-[65px] leading-snug text-center pb-12">
        Projet suivant
      </h1>
    </section>
    <div class="relative h-[33vh] w-full flex justify-center">
      <img
        ref="imgRef"
        :src="project.imgSrc"
        :class="[
          'h-[100%] object-cover absolute left-0 right-0 mx-auto transition-all duration-500'
        ]"
        alt=""
      />
      <div
        ref="textRef"
        :class="[
          'text-white lg:text-3xl z-40 font-display uppercase absolute top-0 bottom-0 my-auto flex flex-col justify-center transition-all delay-1000 duration-1000 mx-auto pointer-events-none'
        ]"
      >
        <p class="font-bold">{{ project.title }}</p>
      </div>
    </div>
    <div class="flex justify-center pt-12">
      <AButton
        @click="
          $router.replace({
            name: 'projets',
            query: {
              default: index
            },
            params: {
              id: 'default'
            }
          })
        "
        v-mouse
      >
        Prochain projet
      </AButton>
    </div>
  </div>
</template>
