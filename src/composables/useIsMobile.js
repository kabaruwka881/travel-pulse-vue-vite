import { ref, onMounted, onUnmounted } from 'vue'

export function useIsMobile(maxWidth = 768) {
  const query = `(max-width: ${maxWidth}px)`
  const isMobile = ref(window.matchMedia(query).matches)
  let mq
  const onChange = (e) => {
    isMobile.value = e.matches
  }
  onMounted(() => {
    mq = window.matchMedia(query)
    mq.addEventListener('change', onChange)
  })
  onUnmounted(() => mq && mq.removeEventListener('change', onChange))
  return isMobile
}
