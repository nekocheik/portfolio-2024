<script setup lang="ts">
import ArrowDown from '@/components/icons/ArrowDown.vue'
import Projet from '@/views/Projet.vue'
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isMode3 = computed(() => route.path === '/projets/one')

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
        id: 'one'
      }
    })
  }
}

// Références pour les éléments à animer
const imgRef = ref(null)
const textRef = ref(null)
const containerRef = ref(null)
const arrowRef = ref(null) // Référence pour ArrowDown
const highlightRef = ref(null) // Référence pour l'indicateur highlight

const animateTransition = () => {
  if (isMode3.value) {
    imgRef.value.style.width = '120%'
    textRef.value.style.transform = 'translateX(40px) scale(1.1)'
    containerRef.value.style.width = '80vw'
    containerRef.value.style.height = '509px'
  } else {
    imgRef.value.style.width = '100%'
    textRef.value.style.transform = 'translateX(0px) scale(1)'
    containerRef.value.style.width = '448px'
    containerRef.value.style.height = '396px'
  }
}

watch(
  () => route.path,
  () => {
    animateTransition()
  }
)

onMounted(() => {
  animateTransition()
  nextTick(() => moveHighlight(currentProjectIndex.value)) // Positionne l'indicateur au chargement
})

// Fonction de défilement
const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

// Fonction pour déplacer l'indicateur highlight
const moveHighlight = (index) => {
  const highlight = highlightRef.value
  const indicators = document.querySelectorAll('.indicator')
  const target = indicators[index]

  if (highlight && target) {
    const rect = target.getBoundingClientRect()
    const containerRect = target.parentElement.getBoundingClientRect()
    const translateX = rect.left - containerRect.left
    highlight.style.transform = `translateX(${translateX}px)`
  }
}

// Projets mock
const projects = ref([
  {
    id: 'one',
    title: 'How we build the world together',
    role: 'Back-end',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit convallis massa vel porta amet, in tincidunt venenatis...',
    imgSrc: 'https://picsum.photos/600/400?random=1',
    year: 2019,
    technologies: ['Vue.js', 'mongodb', 'Node.js']
  },
  {
    id: 'two',
    title: 'Creating Digital Landscapes',
    role: 'UI/UX Designer',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non mi porta gravida at eget metus...',
    imgSrc: 'https://picsum.photos/600/400?random=2',
    year: 2020,
    technologies: ['Adobe XD', 'Figma', 'Sketch']
  },
  {
    id: 'three',
    title: 'Innovating for the future',
    role: 'Front-end',
    description:
      'Aliquam erat volutpat. Nullam ac diam at lacus euismod fermentum. Etiam pharetra augue non turpis vehicula, nec malesuada...',
    imgSrc: 'https://picsum.photos/600/400?random=3',
    year: 2021,
    technologies: ['React', 'Redux', 'TypeScript']
  },
  {
    id: 'four',
    title: 'AI and Machine Learning',
    role: 'Data Scientist',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum...',
    imgSrc: 'https://picsum.photos/600/400?random=4',
    year: 2022,
    technologies: ['Python', 'TensorFlow', 'Keras']
  },
  {
    id: 'five',
    title: 'Developing Mobile Solutions',
    role: 'Mobile Developer',
    description:
      'Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla...',
    imgSrc: 'https://picsum.photos/600/400?random=5',
    year: 2023,
    technologies: ['Flutter', 'Dart', 'Firebase']
  }
])

const currentProjectIndex = ref(0)
const currentProject = computed(() => projects.value[currentProjectIndex.value])

const changeProject = (index) => {
  currentProjectIndex.value = index
  moveHighlight(index)
}
</script>

<template>
  <div class="relative">
    <h1
      class="hidden lg:block z-30 pt-24 pl-24 text-tertiary text-5xl font-thin font-display italic"
    >
      Projets
    </h1>
    <div class="relative h-[70vh] top-[15vh] lg:top-0">
      <div
        @click="() => !isMode3 || toggleMode()"
        ref="containerRef"
        class="lg:z-50 w-[88vw] h-[60vh] bg-white absolute top-0 left-0 right-0 mx-auto my-auto bottom-0 rounded-lg transition-container duration-500 lg:h-96 lg:w-[448px] lg:ml-40 cursor-pointer overflow-hidden"
      >
        <div class="relative h-full w-full">
          <img
            ref="imgRef"
            :src="currentProject.imgSrc"
            class="h-[100%] object-cover absolute left-0 right-0 mx-auto transition-img"
            alt=""
          />
          <div
            ref="textRef"
            class="text-white text-5xl z-40 font-display uppercase absolute top-0 bottom-0 my-auto flex flex-col justify-center transition-all duration-500"
          >
            <p class="font-bold">{{ currentProject.title }}</p>
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
        <section class="hidden lg:block absolute top-[-50px] text-5xl font-bold">
          <p>{{ currentProjectIndex + 1 }}</p>
          <p class="pt-4">{{ projects.length }}</p>
        </section>
        <p class="hidden lg:block pt-32"><strong>Role</strong> / {{ currentProject.role }}</p>

        <div class="hidden lg:block w-[400px] text-right pt-20 lg:text-xl">
          <p>
            {{ currentProject.description }}
          </p>
        </div>

        <AButton @click="toggleMode" class="mx-auto mt-[60vh] lg:relative lg:mt-20 lg:mr-32">
          En voir plus
        </AButton>
      </div>
    </div>
    <div ref="projetIndicator" v-show="!isMode3" class="pl-10 flex justify-center pt-8">
      <div class="relative flex w-60 justify-around">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          @click="changeProject(index)"
          class="indicator w-5 h-5 bg-primary rounded-md flex items-center cursor-pointer transition-all duration-300"
          :class="{ 'bg-secondary': currentProjectIndex === index }"
        >
          <span
            class="indicator-square w-5/6 h-5/6 block m-auto rounded-sm"
            :class="{ active: currentProjectIndex === index }"
          ></span>
        </div>
        <div ref="highlightRef" class="indicator-highlight absolute bg-white rounded-sm"></div>
      </div>
    </div>
  </div>
  <div v-show="isMode3" @click="scrollDown">
    <div ref="arrowRef" class="hidden lg:flex justify-center pt-8 arrow-down-animation">
      <ArrowDown />
    </div>
  </div>

  <Projet v-if="isMode3" :project="currentProject" />
</template>

<style lang="scss" scoped>
.arrow-down-animation {
  animation: arrow-bounce 1s infinite;
  cursor: pointer;
}

@keyframes arrow-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(20px);
    opacity: 0.5;
  }
}

.indicator {
  position: relative;
  transition: transform 0.3s;
}

.indicator-square {
  background-color: transparent;
  transition: background-color 0.3s;
}

.indicator-square.active {
  background-color: white;
}

.indicator:hover .indicator-square {
  background-color: white;
}

.indicator-highlight {
  width: 24px; /* Ajusté en fonction de la taille de vos indicateurs */
  height: 24px; /* Ajusté en fonction de la taille de vos indicateurs */
  transition: transform 0.3s;
  z-index: -1; /* Place derrière les indicateurs */
}
</style>
