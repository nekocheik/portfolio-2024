import { useMouse } from '@/store/mouse'

export default {
  beforeMount(el) {
    const store = useMouse()

    el.classList.add('transition-transform')
    el.classList.add('duration-700')
    
    el.handleMouseEnter = () => {
      store.isHover = true
      el.classList.add('scale-110')
    }

    el.handleMouseLeave = () => {
      store.isHover = false
      el.classList.remove('scale-110')
    }

    // Ajouter les événements
    el.addEventListener('mouseenter', el.handleMouseEnter)
    el.addEventListener('mouseleave', el.handleMouseLeave)
  },
  unmounted(el) {
    // Nettoyage des événements lorsque l'élément est démonté
    el.removeEventListener('mouseenter', el.handleMouseEnter)
    el.removeEventListener('mouseleave', el.handleMouseLeave)
  }
}
