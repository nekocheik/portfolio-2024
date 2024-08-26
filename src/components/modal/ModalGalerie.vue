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
              <img
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 transition-all duration-1000 lg:mx-[500px] blur-lg"
                :class="{
                  '!scale-100': isPrevious,
                  'blur-none': onTransition
                }"
                :style="{ 'max-height': 'inherit' }"
                @click="pervious"
                :src="NewImagePrev || images[currentImgage - 1] || images[images.length - 1]"
                alt=""
              />
              <img
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] lg:mx-[500px]"
                :class="{
                  'transition-transform duration-1000': onTransition
                }"
                :style="{ 'max-height': 'inherit' }"
                :src="NewImageCurrent || images[currentImgage]"
                alt=""
              />
              <img
                class="h-[50vh] lg:max-w-[100vh] lg:max-h-[60vh] scale-90 lg:mx-[500px] blur-lg duration-1000 transition-all"
                :class="{ '!scale-100': isNext, 'blur-none': onTransition }"
                :style="{ 'max-height': 'inherit' }"
                @click="next"
                :src="NewImageNext || images[currentImgage + 1] || images[0]"
                alt=""
              />
            </section>
          </div>
        </section>

        <section class="flex justify-center">
          <img
            class="max-w-[200px] lgm: mr-10 cursor-pointer"
            @click="switchImage(index)"
            v-for="(image, index) in images"
            :src="image"
            alt=""
          />
        </section>

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
import projetInformations from "@/helpers/projetInformation.js";
const isPrevious = ref(false)
const isNext = ref(false)
const onTransition = ref(false)
const currentImgage = ref(0)
const images = ['/team-product.png', '/screen_1.png', '/screen_2.png', '/screen_3.png']
const NewImageNext = ref('')
const NewImageCurrent = ref('')
const NewImagePrev = ref('')

const switchImage = (index: number) => {
  if (!onTransition.value && currentImgage.value != index) {
    onTransition.value = true
    if (index > currentImgage.value) {
      NewImageNext.value = images[index]
      isNext.value = true
    } else {
      NewImagePrev.value = images[index]
      isPrevious.value = true
    }

    setTimeout(() => {
      NewImageCurrent.value = images[index]
    }, 1000)

    setTimeout(() => {
      currentImgage.value = index
      onTransition.value = false
      isNext.value = false
      isPrevious.value = false

      NewImagePrev.value = ''
      NewImageNext.value = ''
      NewImageCurrent.value = ''
    }, 1100)
  }
}

const next = () => {
  if (!onTransition.value) {
    onTransition.value = true
    isNext.value = true

    setTimeout(() => {
      NewImageCurrent.value = images[(currentImgage.value + 1) % images.length]
    }, 1000)

    setTimeout(() => {
      onTransition.value = false
      NewImageCurrent.value = ''
      isNext.value = false
      currentImgage.value = (currentImgage.value + 1) % images.length
    }, 1100)
  }
}
const pervious = () => {
  if (!onTransition.value) {
    onTransition.value = true
    isPrevious.value = true

    setTimeout(() => {
      NewImageCurrent.value = images[(currentImgage.value - 1 + images.length) % images.length]
    }, 1000)

    setTimeout(() => {
      onTransition.value = false
      isPrevious.value = false
      currentImgage.value = (currentImgage.value - 1 + images.length) % images.length
    }, 1100)
  }
}
</script>

<style lang="scss" scoped>
.SelectStakingGuardian {
}
</style>
