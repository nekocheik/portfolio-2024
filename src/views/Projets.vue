<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import Projet from '@/views/Projet.vue'
import ProjetEnd from '@/views/ProjetEnd.vue'
import { useRoute, useRouter } from 'vue-router'
import projetInformations from '@/helpers/projetInformation.js'

const route = useRoute()
const router = useRouter()

// Correction du type pour `isMode3`
const isMode3 = computed(() => /\/projets\/\d+/.test(route.path))

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

const imgRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null) 
const transitionXIndicator = ref<number | null>(null)
const indicators = ref<HTMLElement | null>(null)

// Fonction de défilement
const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

// Projets mock
const projects = ref<typeof projetInformations>(projetInformations)
const currentProjectIndex = ref<number>(route.params.id !== 'default' ? Number(route.params.id) : 0)
const currentProject = computed(() => projects.value[currentProjectIndex.value])
const indicatorOnTransion = ref(false)
let interIndicator: ReturnType<typeof setTimeout> | null = null

if (route.query.default) {
  currentProjectIndex.value = Number(route.query.default)
  window.log(currentProjectIndex.value)
}

onMounted(() => {
  if (route.query.default) {
    currentProjectIndex.value = Number(route.query.default)
  }
})

watch(route, () => {
  if (route.query.default) {
    currentProjectIndex.value = Number(route.query.default)
    console.log('ici --', currentProjectIndex.value)
  }
})

const changeProject = (index: number) => {
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

const openLink = (index: number) => {
  window.open(projects.value[index].link)
}
</script>


<template>
  <section class="lg:pb-20">
    <div class="relative">
      <h1
        class="hidden lg:block z-30 pt-16 pl-32 text-tertiary text-5xl lg:text-[80px] font-thin font-display italic duration-1000 transition-generericAnimation -translate-x-96 opacity-0"
        :class="{ isMode3: 'translate-x-20' }"
      >
        Projets
      </h1>
      <div
        class="relative h-[30vh] mt-40  sm:pl-32 lg:pl-0 max-h-[600px] top-[7vh] lg:mt-0 lg:h-[63vh] lg:top-10 z-50 2xl:top-[80px]"
      >
        <div
          @click="() => toggleMode()"
          ref="containerRef"
          :class="[
            'lg:z-50 bg-white absolute top-0 left-0 right-0 mx-auto my-auto bottom-0 rounded-lg transition-all duration-700 cursor-pointer overflow-hidden max-h-64 sm:max-h-none',
            indicatorOnTransion ? 'lg:-translate-x-[200%]' : '',
            isMode3 ? 'w-[80vw] h-[509px]' : 'w-[74vw] h-[60vh] lg:h-72 lg:w-[400px] lg:ml-32'
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
            class="text-white lg:w-[77vw] w-[88vw] lg:max-w-[1450px] absolute top-0 right-0 lg:right-auto my-auto bottom-0 flex flex-col items-end pr-14 transition-all duration-1000"
            :class="{ 'translate-x-[100vw]': isMode3 }"
          >
            <section class="absolute -top-20 bottom-[-21px] text-5xl font-bold right-12 -rotate-12 lg:top-0 sm:-rotate-0">
              <p>{{ currentProjectIndex + 1 }}</p>
              <p class="pt-4">{{ projects.length }}</p>
            </section>
            <p class="hidden lg:block pt-32 lg:pl-20">
              <strong class="text-primary">Role</strong> / {{ currentProject.role }}
            </p>

            <div class="hidden lg:block w-5/12 text-right pt-10 lg:text-base lg:min-h-[230px]">
              <p>
                {{ currentProject.description }}
              </p>
            </div>

            <AButton @click="toggleMode()" class="mx-auto mt-[55vh] lg:relative lg:mt-10 lg:mr-32 z-[100] hidden lg:block">
              En voir plus
            </AButton>
          </div>
        </div>
      </div>
      <section
        :class="{ 'translate-y-96 opacity-0': isMode3 }"
        class="transition-[translate opacity] duration-1000"
      >
        <div class="lg:pl-10 flex justify-center sm:pt-60 pt-28 lg:pt-14 2xl:pt-20">
          <div class="relative flex w-60 justify-around">
            <div
              v-for="(project, index) in projects"
              :key="project.id"
              @click="changeProject(index)"
              :class="{ 'scale-110': currentProjectIndex == index }"
              v-mouse
              class="w-5 h-5 bg-primary rounded-md flex items-center cursor-pointer transition-all duration-300"
            ></div>
            <div
              class="left-[30px] absolute w-60 pointer-events-none transition-transform duration-1000"
              :style="{
                transform: `translateX(${(100 / projects.length) * currentProjectIndex}%)`
              }"
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
    <ProjetEnd
      v-if="isMode3 && projects[Number(currentProjectIndex) + 1]"
      :index="Number(currentProjectIndex) + 1"
      :project="projects[Number(currentProjectIndex) + 1]"
    />
  </section>
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
