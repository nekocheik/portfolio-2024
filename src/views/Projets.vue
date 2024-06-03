<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import Projet from '@/views/projet.vue'

const route = useRoute()
const router = useRouter()

const isMode3 = computed(() => route.path === '/projets/1')

const toggleMode = () => {
  console.log(route.path)
  if (!route.path.includes('default')) {
    router.push({
      name: 'projet',
      params: {
        id: "default"
      }
    })
  } else {
    router.push({
      name: 'projets',
      params: {
        id: "1"
      }
    })

  }
}

// Références pour les éléments à animer
const imgRef = ref(null)
const textRef = ref(null)
const containerRef = ref(null)

const animateTransition = () => {
  if (isMode3.value) {
    gsap.to(imgRef.value, { width: '120%', duration: 0.5 })
    gsap.to(textRef.value, { translateX: '40px', scale: 1.1, duration: 0.5 })
    gsap.to(containerRef.value, { width: '80vw', height: '509px', duration: 0.5 })
  } else {
    gsap.to(imgRef.value, { width: '100%', duration: 0.5 })
    gsap.to(textRef.value, { translateX: '0px', scale: 1, duration: 0.5 })
    gsap.to(containerRef.value, { width: '448px', height: '96px', duration: 0.5 })
  }
}

watch(isMode3, animateTransition)

onMounted(() => {
  animateTransition()
})
</script>

<template>
  <div>
    <h1
      class="hidden lg:block z-30 pt-24 pl-24 text-tertiary text-5xl font-thin font-display italic"
    >
      Projets
    </h1>
    <div class="relative h-[70vh] top-[15vh] lg:top-0">
      <div
        @click="() => !isMode3 || toggleMode()"
        ref="containerRef"
        class="lg:z-50 w-[88vw] h-[60vh] bg-white absolute top-0 left-0 right-0 mx-auto my-auto bottom-0 rounded-lg transition-container lg:h-96 lg:w-[448px] lg:ml-40 cursor-pointer overflow-hidden"
      >
        <div class="relative h-full w-full">
          <img
            ref="imgRef"
            src="/generic-bg.jpg"
            class="h-[100%] object-cover absolute left-0 right-0 mx-auto transition-img"
            alt=""
          />
          <div
            ref="textRef"
            class="text-white text-5xl z-40 font-display uppercase absolute top-0 bottom-0 my-auto flex flex-col justify-center transition-text"
          >
            <p class="font-bold">How we build</p>
            <p class="font-bold pl-2">the world</p>
            <p class="font-bold">together</p>
          </div>
          <div
            class="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 cursor-pointer"
          ></div>
        </div>
      </div>
      <div
        class="text-white w-[88vw] lg:max-w-[1300px] absolute top-0 right-0 lg:right-auto my-auto bottom-0 flex flex-col items-end pr-14 transition-all duration-500"
        :class="{ 'translate-x-[100vw]': isMode3 }"
      >
        <section class="pt-20 hidden lg:block">1/ 4</section>
        <p class="pt-8 hidden lg:block"><strong>Role</strong> / Back-end</p>

        <div class="hidden lg:block w-[400px] text-right pt-20 lg:text-xl">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit convallis massa vel porta
            amet, in tincidunt venenatis. At tristique congue nulla id natoque hac. Viverra eget
            quis amet non lorem quam dui eget. Ipsum est adipiscing at imperdiet consequat nulla
            purus ....mauris.
          </p>
        </div>

        <AButton @click="toggleMode" class="mx-auto mt-[60vh] lg:relative lg:mt-20 lg:mr-32">
          En voir plus
        </AButton>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
/* Les styles sont inchangés, GSAP prend en charge les transitions */
</style>
