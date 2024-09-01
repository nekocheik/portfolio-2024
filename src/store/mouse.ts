import { defineStore } from 'pinia'

export const useMouse = defineStore('useMouse', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      isHover: false,
    }
  },
})

export default useMouse