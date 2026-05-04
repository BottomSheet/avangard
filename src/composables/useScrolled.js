import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Возвращает реактивный флаг — прокручен ли пользователь
 * ниже порога. Используется для смены стиля шапки.
 */
export function useScrolled(threshold = 40) {
  const scrolled = ref(false)

  function onScroll() {
    scrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrolled }
}
