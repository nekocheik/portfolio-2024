<template>
  <button
    @click="navigate"
    :class="[
      'text-white font-normal text-lg cursor-pointer text-body',
      { underline: isActive }
    ]"
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
