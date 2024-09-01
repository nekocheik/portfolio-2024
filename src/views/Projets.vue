<script setup lang="ts">
import ArrowDown from '@/components/icons/ArrowDown.vue'
import Projet from '@/views/Projet.vue'
import ProjetEnd from '@/views/ProjetEnd.vue'
import { useRoute, useRouter } from 'vue-router'
import projetInformations from '@/helpers/projetInformation.js'

const route = useRoute()
const router = useRouter()

const isMode3 = computed(() => /\/projets\/[{0-9}]+/.test(route.path))

const toggleMode = () => {
  if (isMode3.value) {
    router.replace({
      name: 'projets',
      params: {
        id: 'default'
      }
    })
  } else {
    router.replace({
      name: 'projets',
      params: {
        id: `${currentProjectIndex.value}`
      }
    })
  }
}

// Références pour les éléments à animer
const imgRef = ref(null)
const textRef = ref(null)
const containerRef = ref(null)
const arrowRef = ref(null) // Référence pour ArrowDown
const transitionXIndicator = ref(null)
const indicators = ref()

// Fonction de défilement
const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

// Projets mock
const projects = ref(projetInformations)
const currentProjectIndex = ref( route.params.id !== 'default' ? route.params.id : 0)
const currentProject = computed(() => projects.value[currentProjectIndex.value])
const indicatorOnTransion = ref(false)
let interIndicator = null

const changeProject = (index: Number) => {
  indicatorOnTransion.value = true

  setTimeout(() => {
    currentProjectIndex.value = index
  }, 450)

  if (interIndicator) {
    clearInterval(interIndicator)
  }

  interIndicator = setTimeout(() => {
    indicatorOnTransion.value = false
  }, 600)
}

const openLink = (index: string) => {
  window.open(projects.value[index].link)
}
</script>

<template>
  <div class="relative">
    <h1
      class="hidden lg:block z-30 pt-16 pl-32 text-tertiary text-5xl lg:text-[80px] font-thin font-display italic duration-1000 transition-generericAnimation -translate-x-96 opacity-0"
      v-intersect="{ delay: 600, true: ['!-translate-x-0', '!opacity-100'] }"
      :class="{ isMode3: 'translate-x-20' }"
    >
      Projets
    </h1>
    <div class="relative h-[70vh] max-h-[600px] top-[15vh] lg:h-[63vh] lg:top-10 z-50 2xl:top-[80px]">
      <div
        @click="() => toggleMode()"
        ref="containerRef"
        v-intersect="{ delay: 1000, true: ['-translate-x-0', 'opacity-100'], false: ['-translate-x-96', 'opacity-0'] }"
        :class="[
          'lg:z-50 bg-white absolute top-0 left-0 right-0 mx-auto my-auto bottom-0 rounded-lg transition-all duration-700 cursor-pointer overflow-hidden',
          indicatorOnTransion ? 'lg:-translate-x-[200%]' : '',
          isMode3 ? 'w-[80vw] h-[509px]' : 'w-[88vw] h-[60vh] lg:h-72 lg:w-[400px] lg:ml-32'
        ]"
      >
        <div class="relative h-full w-full flex justify-center">
          <img
            ref="imgRef"
            :src="currentProject.imgSrc"
            :class="[
              'h-[100%] object-cover absolute left-0 right-0 mx-auto transition-all duration-500',
              isMode3 ? 'w-[120%]' : 'w-[100%]'
            ]"
            alt=""
          />
          <div
            ref="textRef"
            :class="[
              'text-white lg:text-3xl z-40 font-display uppercase absolute top-0 bottom-0 my-auto flex flex-col justify-center transition-all delay-1000 duration-1000 mx-auto pointer-events-none',
              isMode3 ? '' : 'translate-x-0 scale-100'
            ]"
          >
            <p class="font-bold">{{ currentProject.title }}</p>
          </div>
          <div
            class="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 cursor-pointer"
          ></div>
        </div>
      </div>
      <div class="relative">
        <div
          class="text-white w-[88vw] lg:max-w-[1150px] absolute top-0 right-0 lg:right-auto my-auto bottom-0 flex flex-col items-end pr-14 transition-all duration-1000"
          :class="{ 'translate-x-[100vw]': isMode3 }"
        >
          <section class="hidden lg:block absolute bottom-[-21px] text-5xl font-bold right-12">
            <p>{{ currentProjectIndex + 1 }}</p>
            <p class="pt-4">{{ projects.length }}</p>
          </section>
          <p class="hidden lg:block pt-32"><strong class="text-primary">Role</strong> / {{ currentProject.role }}</p>

          <div class="hidden lg:block w-[500px] text-right pt-10 lg:text-base lg:min-h-[230px]">
            <p>
              {{ currentProject.description }}
            </p>
          </div>

          <AButton @click="toggleMode()" class="mx-auto mt-[60vh] lg:relative lg:mt-10 lg:mr-32">
            En voir plus
          </AButton>
        </div>
      </div>
    </div>
    <section
      :class="{ 'translate-y-96 opacity-0': isMode3 }"
      class="transition-[translate opacity] duration-1000"
    >
      <div class="lg:pl-10 flex justify-center pt-40 lg:pt-14 2xl:pt-20">
        <div class="relative flex w-60 justify-around">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            @click="changeProject(index)"
            :class="{ 'scale-110': currentProjectIndex == index }"
            class="w-5 h-5 bg-primary rounded-md flex items-center cursor-pointer transition-all duration-300"
          ></div>
          <div
            class="left-[30px] absolute w-60 pointer-events-none transition-transform duration-1000"
            :style="{ transform: `translateX(${(100 / projects.length) * currentProjectIndex}%)` }"
          >
            <div
              :class="{ 'opacity-30 blur-lg': indicatorOnTransion }"
              class="h-5 w-5 bg-white rounded-lg transition-all duration-1000"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-show="isMode3" @click="scrollDown" class="h-11">
    <div ref="arrowRef" class="hidden lg:flex justify-center pt-8 arrow-down-animation">
      <ArrowDown />
    </div>
  </div>

  <Projet v-if="isMode3" :project="currentProject" />
  <ProjetEnd v-if="isMode3" :project="currentProject" />
</template>

<style lang="scss" scoped>
.arrow-down-animation {
  @apply animate-bounce cursor-pointer;
}

.indicator {
  @apply relative transition-transform duration-300;
}

.indicator-square {
  @apply bg-transparent transition-colors duration-300;
}

.indicator-square.active {
  @apply bg-white;
}

.indicator:hover .indicator-square {
  @apply bg-white;
}
</style>
