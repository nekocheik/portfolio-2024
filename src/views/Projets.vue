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
const transitionXIndicator = ref(null)
const indicators = ref()

// Fonction de défilement
const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

// Projets mock
const projects = ref([
  {
    id: 'one',
    title: 'The aquaverse',
    role: 'Lead Tech | Lead Developer chez Aquaverse',
    link: 'https://656bf3d4.frontend-preproduction-29946.pages.dev/',
    description:
      'Lead tech au sein d’une jeune start-up dans le domaine de la cryptomonnaie. À la tête d’une équipe technique de cinq développeurs et d’un chef de projet technique. Ma mission était de définir, maintenir et faire évoluer la partie tech de l’entreprise en définissant les objectifs cours, moyens, long term des différentes briques techniques de notre écosystème.',
    bigDescription: `
<p class="text-base font-medium">En tant que <span class="text-primary font-semibold">Lead Tech</span> chez Aquaverse, j’ai dirigé une équipe technique pour développer un site web utilisant <span class="text-primary font-semibold">Vue.js</span>. J’étais responsable de la gestion d’une équipe de cinq développeurs et d’un chef de projet technique, en utilisant une approche <span class="text-primary font-semibold">agile</span>.</p>
<br />

<p class="text-lg font-bold">Principales Contributions :</p>
<br />
<p><span class="font-semibold">• Gestion Agile :</span> Mise en place de <span class="text-primary font-semibold">rituels quotidiens</span> et coordination des tâches avec <span class="text-primary font-semibold">Linear</span> et <span class="text-primary font-semibold">GitLab</span>.</p>
<br />
<p><span class="font-semibold">• Développement d'une librairie custom :</span> Création d’un <span class="text-primary font-semibold">module interne</span> pour faciliter les appels à la blockchain et améliorer la fluidité des transactions.</p>
<br />
<p><span class="font-semibold">• Optimisation des Animations :</span> Utilisation d'<span class="text-primary font-semibold">animations CSS</span> pour maintenir la performance du site tout en évitant les lourdes animations en JavaScript.</p>
<br />
<p><span class="font-semibold">• Gestion des Performances et Compatibilité :</span> Résolution des problèmes de <span class="text-primary font-semibold">compatibilité des navigateurs</span> et optimisation du site pour offrir une <span class="text-primary font-semibold">expérience utilisateur fluide</span>.</p>
<br />
<p><span class="font-semibold">• Définition de la Roadmap Générale :</span> Élaboration de la <span class="text-primary font-semibold">roadmap stratégique</span> pour Aquaverse.</p>
<br />
<p><span class="font-semibold">• Définition des Architectures Back-End :</span> Conception des <span class="text-primary font-semibold">architectures back-end</span> pour le projet.</p>
<br />
<p><span class="font-semibold">• Choix des Technologies Internes :</span> Définition des <span class="text-primary font-semibold">technologies utilisées en interne</span>.</p>
<br />
<p><span class="font-semibold">• Passage d’Entretiens :</span> Réalisation d'<span class="text-primary font-semibold">entretiens</span> pour le recrutement.</p>
<br />
<p><span class="font-semibold">• Formation des Développeurs :</span> <span class="text-primary font-semibold">Formation</span> et <span class="text-primary font-semibold">mentorat</span> des développeurs au sein de l’équipe.</p>
<br />
<p><span class="font-semibold">En parallèle :</span> J’ai joué un rôle clé dans la <span class="text-primary font-semibold">définition du cadre DevOps</span> et la mise en place d’une <span class="text-primary font-semibold">infrastructure sécurisée</span>. J’ai élaboré la <span class="text-primary font-semibold">roadmap DevOps</span> et supervisé l’implémentation d’une architecture basée sur <span class="text-primary font-semibold">Kubernetes</span>, intégrant le <span class="text-primary font-semibold">déploiement continu</span> avec des <span class="text-primary font-semibold">tests automatisés</span>. J’ai mis en place des <span class="text-primary font-semibold">tests end-to-end</span> et des <span class="text-primary font-semibold">tests unitaires</span> via GitLab pour assurer la qualité et la stabilité du système.</p>
`,
    imgSrc:
      'https://656bf3d4.frontend-preproduction-29946.pages.dev/assets/background_hader_home_desktop.ac559061.jpg',
    year: 2021,
    medias: [
      {
        title: 'Développement du site internet',
        text: 'Création de la leanding page pour le site aquaverse site qui moder design avec de belle animation et des call api avec divers services backend, blockchaine et micros service interne.',
        img: '/team-product.png'
      },
      {
        title: 'Création d’animation en css',
        text: 'Création d’un animation dans le but de claim son guardians v2, le but était de faire en sorte de convertir une version de son nft afin d’obtenir une version améliorer. ma mission a été d’animer une partie du claim afin de rendre l’experience imersive pour nos utilisateur. nous avons fin une animation de cart qui vient se jeter dans un portail en css.',
        video: '/claime_guardian.mp4'
      },
      {
        title: 'interface interactif et fluide',
        text: 'Pour récompensé nos older de guardians nous avons offert des lootbox qui pouvait être ouvrir, nous avons du mettre un sytème complex d’ouverture de lootboox avex la blockchaine elrond qui suivait par une animation de card qui flip',
        video: '/oppening_loot_box.mp4'
      },
      {
        title: 'espace client',
        text: 'Création d’un espace client afin de permettre au utilsateurs de gerer le compte utilisateur :',
        video: '/account_page_the_aquaverse.mp4'
      }
    ],
    technologies: ['Vue.js', 'React', 'pinia', 'docker', 'mongodb', 'Node.js']
  },
  {
    id: 'two',
    title: 'Creating Digital Landscapes',
    link: 'https://656bf3d4.frontend-preproduction-29946.pages.dev/',
    role: 'UI/UX Designer',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non mi porta gravida at eget metus...',
    bigDescription: '',
    imgSrc: 'https://picsum.photos/600/400?random=2',
    year: 2020,
    technologies: ['Adobe XD', 'Figma', 'Sketch']
  },
  {
    id: 'three',
    title: 'Innovating for the future',
    role: 'Front-end',
    link: 'https://656bf3d4.frontend-preproduction-29946.pages.dev/',
    description:
      'Aliquam erat volutpat. Nullam ac diam at lacus euismod fermentum. Etiam pharetra augue non turpis vehicula, nec malesuada...',
    bigDescription: '',
    imgSrc: 'https://picsum.photos/600/400?random=3',
    year: 2021,
    technologies: ['React', 'Redux', 'TypeScript']
  },
  {
    id: 'four',
    title: 'AI and Machine Learning',
    role: 'Data Scientist',
    link: 'https://656bf3d4.frontend-preproduction-29946.pages.dev/',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum...',
    bigDescription: '',
    imgSrc: 'https://picsum.photos/600/400?random=4',
    year: 2022,
    technologies: ['Python', 'TensorFlow', 'Keras']
  },
  {
    id: 'five',
    title: 'Developing Mobile Solutions',
    role: 'Mobile Developer',
    link: 'https://656bf3d4.frontend-preproduction-29946.pages.dev/',
    description:
      'Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla...',
    bigDescription: '',
    imgSrc: 'https://picsum.photos/600/400?random=5',
    year: 2023,
    technologies: ['Flutter', 'Dart', 'Firebase']
  }
])

const currentProjectIndex = ref(0)
const currentProject = computed(() => projects.value[currentProjectIndex.value])
const indicatorOnTransion = ref(false)
let interIndicator = null

const changeProject = (index: Number) => {
  indicatorOnTransion.value = true

  setTimeout(() => {
    currentProjectIndex.value = index
  }, 450);

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
      class="hidden lg:block z-30 pt-24 pl-24 text-tertiary text-5xl lg:text-[80px] font-thin font-display italic"
    >
      Projets
    </h1>
    <div class="relative h-[70vh] top-[15vh] lg:top-10 z-50">
      <div
        @click="() => !isMode3 || toggleMode()"
        ref="containerRef"
        :class="[
          'lg:z-50 bg-white absolute top-0 left-0 right-0 mx-auto my-auto bottom-0 rounded-lg transition-all duration-1000 cursor-pointer overflow-hidden',
          indicatorOnTransion ? 'lg:-translate-x-[200%]' : '',
          isMode3 ? 'w-[80vw] h-[509px]' : 'w-[88vw] h-[60vh] lg:h-96 lg:w-[448px] lg:ml-40'
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
              'text-white text-5xl z-40 font-display uppercase absolute top-0 bottom-0 my-auto flex flex-col justify-center transition-all delay-1000 duration-1000 mx-auto pointer-events-none',
              isMode3 ? 'translate-x-[40px] scale-[1.1]' : 'translate-x-0 scale-100'
            ]"
          >
            <p class="font-bold">{{ currentProject.title }}</p>
          </div>
          <div
            class="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 cursor-pointer"
          ></div>
        </div>
      </div>
      <div
        class="text-white w-[88vw] lg:max-w-[1300px] absolute top-0 right-0 lg:right-auto my-auto bottom-0 flex flex-col items-end pr-14 transition-all duration-1000"
        :class="{ 'translate-x-[100vw]': isMode3 }"
      >
        <section class="hidden lg:block absolute top-[-50px] text-5xl font-bold">
          <p>{{ currentProjectIndex + 1 }}</p>
          <p class="pt-4">{{ projects.length }}</p>
        </section>
        <p class="hidden lg:block pt-32"><strong>Role</strong> / {{ currentProject.role }}</p>

        <div class="hidden lg:block w-[400px] text-right pt-10 lg:text-xl">
          <p>
            {{ currentProject.description }}
          </p>
        </div>

        <AButton
          @click="toggleMode() && openLink(currentProjectIndex)"
          class="mx-auto mt-[60vh] lg:relative lg:mt-20 lg:mr-32"
        >
          En voir plus
        </AButton>
      </div>
    </div>
    <section
      :class="{ 'translate-y-96 opacity-0': isMode3 }"
      class="transition-[translate opacity] duration-1000"
    >
      <div class="lg:pl-10 flex justify-center pt-40 lg:pt-8">
        <div class="relative flex w-60 justify-around">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            @click="changeProject(index)"
            :class="{ 'scale-110' : currentProjectIndex == index}"
            class="w-5 h-5 bg-primary rounded-md flex items-center cursor-pointer transition-all duration-300"
          ></div>
          <div
            class="left-[14px] absolute w-60 pointer-events-none transition-transform duration-1000"
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
