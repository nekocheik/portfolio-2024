<template>
  <div>
    <TransitionGroup name="fade">
      <ModalGalerie v-if="modalOpen == 'ModalGalerie'" />
			{{ modalOpen }}
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '../composable/useModal'
const { close, open } = useModal()
import ModalGalerie from '../components/modal/ModalGalerie.vue'
import { onMounted } from 'vue'

onMounted(() => {
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Escape') {
      close()
    }
  })
})

$busEvent.on('modalOpen', (data: any) => {
  open(data.detail.modal)
})

const route = useRoute()
const modalOpen = computed(() => route.query.modalOpen?.toLocaleString())
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
