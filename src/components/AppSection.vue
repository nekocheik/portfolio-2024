<template>
  <section class="h-[100vh] w-[100vw] absolute top-0">
    <CanvasContainer ref="canvasContainer" />
    <div
      ref="transitionContainer"
      class="w-[100vw] h-[88vh] transition-all duration-700 bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
      :class="{
        'w-[90vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:h-[70vh] transition-all': isMode2,
        '!h-[100vh] !w-[100vw]': isMode3
      }"
    >
      <SecondCanvasContainer ref="secondCanvasContainer" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CanvasContainer from './CanvasContainer.vue'
import SecondCanvasContainer from './SecondCanvasContainer.vue'

const isMode2 = ref(false)
const isMode3 = ref(false)
</script>
