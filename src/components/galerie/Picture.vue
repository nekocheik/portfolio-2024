<template>
  <div class="pt-10 lg:pt-40">
    <Motion
      :preset="'row' == direction ? 'slideVisibleRight' : 'slideVisibleLeft'"
      :duration="1000"
    >
      <section
        class="flex flex-col lg:content-center"
        :class="{
          'lg:flex-row': 'row' == direction,
          'lg:flex-row-reverse': 'row-reverse' == direction
        }"
      >
        <div class="lg:w-[50vw] px-8 lg:pt-16">
          <Motion preset="slideVisibleBottom" :duration="600">
            <h2 class="text-3xl font font-kiona lg:pb-16">
              <slot name="text">{{ title }}</slot>
            </h2>
          </Motion>

          <p class="pt-2 text-xl font-thin pb-10">
            <slot name="text">
              {{ text }}
            </slot>
          </p>
        </div>

        <section class="lg:blur-sm lg:hover:blur-none transition-all duration-500">
          <div
            class="flex justify-center pt-4 lg:pt-16 lg:grayscale lg:hover:grayscale-0 lg:transition-all lg:duration-500 lg:delay-300"
          >
            <video v-if="video" class="lg:w-[800px] cursor-pointer" controls>
              <source :src="video" type="video/mp4" />
            </video>
            <img
              @click="open('ModalGalerie')"
              v-if="img"
              class="lg:w-[800px] cursor-pointer"
              :src="img"
              alt=""
            />
          </div>
        </section>
      </section>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composable/useModal'
const { open } = useModal()

const { img, video, direction, text, title } = defineProps({
  title: String,
  video: String,
  img: String,
  text: String,
  direction: String
})
</script>
