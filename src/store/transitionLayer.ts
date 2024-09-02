import { defineStore } from 'pinia'

export const useLayerTransition = defineStore('useLayerTransition', {
  state: () => {
    return {
      isVisible: true,
    }
  },
})

export default useLayerTransition