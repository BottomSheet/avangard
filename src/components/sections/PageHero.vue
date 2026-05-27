<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'

defineProps({
  data: { type: Object, required: true }
  // { eyebrow, title, description, image?, imageAlt? }
  // image — URL картинки для Hero. Если не задан, рендерится
  // декоративная заглушка с тем же эффектом анимации.
})

const heroEl = ref(null)
const mediaEl = ref(null)

// ── Параллакс при движении мыши / наклоне устройства ─────────────────
// Картинка плавно следует за курсором на ~12px от центра. Создаёт
// ощущение глубины — фон «живой», даже когда на странице ничего не происходит.
// На мобильных в дополнение к scroll-эффекту слушаем DeviceOrientation,
// чтобы при наклоне телефона картинка слегка отзывалась.
let rafId = null
let targetX = 0  // желаемое смещение X (px)
let targetY = 0  // желаемое смещение Y (px)
let currentX = 0 // текущее смещение X (с инерцией)
let currentY = 0 // текущее смещение Y (с инерцией)
const MAX_OFFSET = 12 // максимальное смещение в пикселях

function loop() {
  // плавное приближение (lerp) — даёт инерцию, не дёрганое следование
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08
  if (mediaEl.value) {
    mediaEl.value.style.setProperty('--hero-parallax-x', `${currentX.toFixed(2)}px`)
    mediaEl.value.style.setProperty('--hero-parallax-y', `${currentY.toFixed(2)}px`)
  }
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  if (!heroEl.value) return
  const rect = heroEl.value.getBoundingClientRect()
  // нормализуем координаты курсора в диапазон [-1, 1] относительно центра секции
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
  targetX = -nx * MAX_OFFSET // инвертируем — фон смещается против курсора (эффект глубины)
  targetY = -ny * MAX_OFFSET
}

function onMouseLeave() {
  // плавно возвращаем в центр, не резко
  targetX = 0
  targetY = 0
}

function onDeviceOrientation(e) {
  // gamma — наклон влево/вправо (-90..90), beta — вперёд/назад (-180..180)
  if (e.gamma == null || e.beta == null) return
  const gx = Math.max(-30, Math.min(30, e.gamma)) / 30 // нормализуем в [-1, 1]
  const gy = Math.max(-30, Math.min(30, e.beta - 45)) / 30
  targetX = -gx * MAX_OFFSET * 0.6 // на мобильных эффект мягче
  targetY = -gy * MAX_OFFSET * 0.6
}

function reduceMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  if (reduceMotion()) return // уважаем системную настройку
  loop()
  // hover-параллакс только когда устройство поддерживает hover (десктоп / трекпад)
  if (window.matchMedia('(hover: hover)').matches) {
    heroEl.value?.addEventListener('mousemove', onMouseMove, { passive: true })
    heroEl.value?.addEventListener('mouseleave', onMouseLeave, { passive: true })
  } else {
    // мобильные: слушаем гироскоп (на iOS требуется разрешение по жесту,
    // здесь не запрашиваем — если оно уже выдано в браузере, сработает)
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  heroEl.value?.removeEventListener('mousemove', onMouseMove)
  heroEl.value?.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('deviceorientation', onDeviceOrientation)
})
</script>

<template>
  <section
    ref="heroEl"
    class="page-hero"
    :class="{ 'has-image': data.image, 'has-placeholder': !data.image }"
  >
    <!-- Базовый тёмный фон — виден до загрузки картинки, без него страница «мигает» -->
    <div class="page-hero-bg"></div>

    <!-- Слой изображения / заглушки. Параллакс реализован CSS-переменными
         --hero-parallax-x/y, которые обновляются из onMouseMove / гироскопа. -->
    <div
      ref="mediaEl"
      class="page-hero-media"
      :class="{ 'is-placeholder': !data.image }"
    >
      <img
        v-if="data.image"
        :src="data.image"
        :alt="data.imageAlt || ''"
        class="page-hero-img"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
    </div>

    <!-- Затемняющий градиент для читабельности текста поверх картинки -->
    <div class="page-hero-scrim"></div>

    <div class="page-hero-content">
      <div class="hero-eyebrow">{{ data.eyebrow }}</div>
      <MultilineHeading level="h1" :text="data.title" />
      <p>{{ data.description }}</p>
    </div>
  </section>
</template>
