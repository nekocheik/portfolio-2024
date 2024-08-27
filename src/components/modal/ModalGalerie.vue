<template>
  <ModalWrapper name="ModalGalerie" class="">
    <template #default>
      <div class="relative w-[100vw] h-[100vh] max-w-[100vw]">
        <section class="h-[70vh] w-[100vw]">
          <div
            class="table absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] mx-auto"
          >
            <section
              :class="{
                'translate-x-[33.3333%]': isPrevious,
                '-translate-x-[33.3333%]': isNext,
                'transition-transform duration-1000': onTransition
              }"
              class="flex"
            >
              <!-- Gestion de l'image ou vidéo précédente -->
              <img
                v-if="projetMedia[prevIndex]?.isImage"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 transition-all duration-1000 lg:mx-[500px] blur-lg"
                :class="{ '!scale-100': isPrevious, 'blur-none': onTransition }"
                :style="{ 'max-height': 'inherit' }"
                @click="pervious"
                :src="NewImagePrev"
                alt=""
              />
              <video
                v-else-if="projetMedia[prevIndex]?.isVideo"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 transition-all duration-1000 lg:mx-[500px] blur-lg"
                :class="{ '!scale-100': isPrevious, 'blur-none': onTransition }"
                @click="pervious"
                :src="videoLinks[prevIndex]"
                muted
              />

              <!-- Gestion de l'image ou vidéo actuelle -->
              <img
                v-if="projetMedia[currentImgage]?.isImage"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] lg:mx-[500px]"
                :class="{ 'transition-transform duration-1000': onTransition }"
                :style="{ 'max-height': 'inherit' }"
                :src="NewImageCurrent"
                alt=""
              />
              <video
                v-else-if="projetMedia[currentImgage]?.isVideo"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] lg:mx-[500px]"
                controls
                :src="videoLinks[currentImgage]"
              ></video>

              <!-- Gestion de l'image ou vidéo suivante -->
              <img
                v-if="projetMedia[nextIndex]?.isImage"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 lg:mx-[500px] blur-lg duration-1000 transition-all"
                :class="{ '!scale-100': isNext, 'blur-none': onTransition }"
                :style="{ 'max-height': 'inherit' }"
                @click="next"
                :src="NewImageNext"
                alt=""
              />
              <video
                v-else-if="projetMedia[nextIndex]?.isVideo"
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 lg:mx-[500px] blur-lg duration-1000 transition-all"
                :class="{ '!scale-100': isNext, 'blur-none': onTransition }"
                @click="next"
                :src="videoLinks[nextIndex]"
                muted
              />
            </section>
          </div>
        </section>

        <!-- Galerie des miniatures -->
        <section class="flex justify-center">
          <img
            v-for="(media, index) in projetMedia"
            :key="index"
            class="max-w-[200px] lgm: mr-10 cursor-pointer"
            @click="switchImage(index)"
            :src="media.isImage ? media.img : media.thumbnail"
            alt=""
          />
        </section>

        <!-- Flèches de navigation -->
        <ArrowRight
          class="absolute top-[50%] right-[10%] translate-y-[-50%] cursor-pointer"
          @click="next"
        />
        <ArrowLeft
          class="absolute top-[50%] left-[10%] translate-y-[-50%] cursor-pointer"
          @click="pervious"
        />
      </div>
    </template>
  </ModalWrapper>
</template>





<script lang="ts" setup>
import ModalWrapper from '../template/ModalWrapper.vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import projetInformations from '@/helpers/projetInformation.js'
import checkType from '@/helpers/checkFile'
import { ref, computed } from 'vue'

const route = useRoute()
const isPrevious = ref(false)
const isNext = ref(false)
const onTransition = ref(false)
const currentImgage = ref(0)

// Initialisation du projetMedia avec vérification du type
const projetMedia = computed(() =>
  projetInformations[route.params.id].medias.map((media: any) => {
    const { isImage, isVideo } = checkType(media.img || media.video || '');
    return { ...media, isImage, isVideo };
  })
);

// Extraction des images et vidéos
const images = projetMedia.value.map(media => media.isImage ? media.img : media.thumbnail);
const videoLinks = projetMedia.value.map(media => media.isVideo ? media.video : null);

// Calcul des index précédents et suivants
const prevIndex = computed(() => (currentImgage.value - 1 + images.length) % images.length);
const nextIndex = computed(() => (currentImgage.value + 1) % images.length);

// Initialisation des images du carrousel
const NewImageCurrent = ref(images[currentImgage.value]);
const NewImageNext = ref(images[nextIndex.value]);
const NewImagePrev = ref(images[prevIndex.value]);

// Fonction de mise à jour des images affichées dans le carrousel
const updateImages = (index: number) => {
  NewImageCurrent.value = images[index];
  NewImageNext.value = images[(index + 1) % images.length];
  NewImagePrev.value = images[(index - 1 + images.length) % images.length];
}

// Fonction de gestion de changement d'image
const switchImage = (index: number) => {
  if (!onTransition.value && currentImgage.value !== index) {
    onTransition.value = true;

    if (index > currentImgage.value) {
      isNext.value = true;
    } else {
      isPrevious.value = true;
    }

    setTimeout(() => {
      updateImages(index);
      currentImgage.value = index;
    }, 1000);

    setTimeout(() => {
      onTransition.value = false;
      isNext.value = false;
      isPrevious.value = false;
    }, 1100);
  }
}

const next = () => {
  if (!onTransition.value) {
    onTransition.value = true;
    isNext.value = true;

    setTimeout(() => {
      currentImgage.value = nextIndex.value;
      updateImages(currentImgage.value);
    }, 1000);

    setTimeout(() => {
      onTransition.value = false;
      isNext.value = false;
    }, 1100);
  }
}

const pervious = () => {
  if (!onTransition.value) {
    onTransition.value = true;
    isPrevious.value = true;

    setTimeout(() => {
      currentImgage.value = prevIndex.value;
      updateImages(currentImgage.value);
    }, 1000);

    setTimeout(() => {
      onTransition.value = false;
      isPrevious.value = false;
    }, 1100);
  }
}

// Initialisation des images au chargement
updateImages(currentImgage.value);
</script>


<style lang="scss" scoped>

.SelectStakingGuardian {
}
</style>
