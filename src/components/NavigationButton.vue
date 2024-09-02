<template>
  <button
    v-mouse
    @click="navigate"
    :class="['text-sm text-white font-normal lg:text-lg text-body font-kiona', { underline: isActive }]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  routeName: String,
  isActive: Boolean
})

const emits = defineEmits(['navigate'])

const navigate = () => emits('navigate', props.routeName)
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
