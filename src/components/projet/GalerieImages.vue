<template>
  <Parallaxy
    :speed="90"
    :animation="(delta: number) => `transform: translate3d(0, ${delta}px, 0);`"
  >
    <div
      class="relative overflow-hidden w-full transform-gpu transition-transform duration-500 ease-out"
      ref="target"
      @mousemove="handleMouseMove"
      @mouseleave="resetTilt"
      :style="{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }"
    >
      <section
        class="w-full h-full block absolute z-30 left-0"
        :style="{ filter: 'url(#nnnoise-filter-img) grayscale(100%)' }"
      ></section>
      <img
        v-intersect="{ delay: 800, true: ['!bg-[#898989b0]', '!opacity-100'] }"
        class="py-10 w-full lg:min-h-[50vh] bg-white duration-700 opacity-75"
        :src="props.img"
        alt=""
        srcset=""
      />
    </div>
  </Parallaxy>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useParallax } from '@vueuse/core'
import Parallaxy from '@lucien144/vue3-parallaxy'

const target = ref(null)
const { source } = useParallax(target)

const tilt = ref({ x: 0, y: 0 })

const props = defineProps({
  img: String
})

const handleMouseMove = (event: MouseEvent) => {
  const rect = target.value?.getBoundingClientRect()
  if (rect) {
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const tiltMaxAngle = 15 // Limite de l'inclinaison en degrés

    tilt.value = {
      x: (y - 0.5) * tiltMaxAngle * -1,
      y: (x - 0.5) * tiltMaxAngle
    }
  }
}

const resetTilt = () => {
  tilt.value = { x: 0, y: 0 }
}
</script>

<style scoped>
/* Ajoutez du style ici si nécessaire */
</style>
