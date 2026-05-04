import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Глобальный reveal-наблюдатель. Подключается один раз в App.vue.
 * Сканирует document на элементы с классом .reveal и навешивает
 * .is-visible когда они появляются во вьюпорте.
 * Пере-сканирует при смене роута (новая страница — новые элементы).
 *
 * Уважает prefers-reduced-motion: reduce — мгновенно помечает все
 * элементы видимыми, не запуская наблюдатель.
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  let observer = null
  const route = useRoute()

  function reduceMotion() {
    return typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function scan() {
    // Авто-применение reveal: все <section> внутри <main>, кроме первой
    // (первая — hero/page-hero, она в видимой области при загрузке).
    const main = document.querySelector('main')
    if (main) {
      const sections = main.querySelectorAll('section')
      sections.forEach((s, i) => {
        if (i === 0) return
        if (!s.classList.contains('reveal') && !s.classList.contains('no-reveal')) {
          s.classList.add('reveal')
        }
      })
    }

    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold, rootMargin })
    }
    els.forEach(el => observer.observe(el))
  }

  onMounted(() => {
    // ждём, пока DOM текущей страницы отрисуется
    requestAnimationFrame(scan)
  })

  // при смене роута новая view рендерится — пере-сканируем
  watch(() => route.fullPath, () => {
    requestAnimationFrame(() => requestAnimationFrame(scan))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
    observer = null
  })
}
