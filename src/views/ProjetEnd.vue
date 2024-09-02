<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import projetInformations from '@/helpers/projetInformation.js'

const route = useRoute()
const router = useRouter()

const isMode3 = computed(() => false)

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

// Projets mock
const projects = ref(projetInformations)
const currentProjectIndex = ref(0)
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


const viewSize = ref({ height: 0, width: 0 })
let invervalWatchClient: any

onMounted(() => {
  invervalWatchClient = setInterval(() => {
    viewSize.value.height = window.innerHeight
    viewSize.value.width = window.innerWidth
  }, 100)
})

onUnmounted(() => {
  clearInterval(invervalWatchClient)
})

</script>

<template>
  <div class="h-[70vh] w-[100vw] bg-white relative"></div>
</template>
