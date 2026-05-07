<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const props = defineProps({
  items: { type: Array, required: true },
  // 'material' | 'equipment' | 'service'
  kind: { type: String, default: 'material' },
  label: { type: String, default: 'Похожие товары' },
  title: { type: String, default: 'Смотрите также' }
})

const baseRoute = computed(() => {
  if (props.kind === 'equipment') return '/equipment'
  if (props.kind === 'service') return '/services'
  return '/materials'
})

const scrollerRef = ref(null)

// ─── Состояние скролла ─────────────────────────────────
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const isOverflowing = ref(false)   // нужно ли вообще листать
const progress = ref(0)             // 0..1 для индикатора-полосы

function updateScrollState() {
  const el = scrollerRef.value
  if (!el) return

  const maxScroll = el.scrollWidth - el.clientWidth
  isOverflowing.value = maxScroll > 1
  canScrollLeft.value = el.scrollLeft > 1
  canScrollRight.value = el.scrollLeft < maxScroll - 1
  progress.value = maxScroll > 0 ? Math.min(1, Math.max(0, el.scrollLeft / maxScroll)) : 0
}

// ─── Кнопки-стрелки ────────────────────────────────────
function getStep() {
  const el = scrollerRef.value
  if (!el) return 320
  // Шаг = ширина первой карточки + gap. Берём её динамически —
  // если поменяешь размер карточки в CSS, всё будет работать.
  const firstCard = el.querySelector('.related-card')
  if (!firstCard) return 320
  const cardWidth = firstCard.getBoundingClientRect().width
  // gap между карточками = 20px (см. CSS)
  return cardWidth + 20
}

function scrollByStep(direction) {
  const el = scrollerRef.value
  if (!el) return
  el.scrollBy({ left: direction * getStep(), behavior: 'smooth' })
}

// ─── Drag-by-mouse (на десктопе) ───────────────────────
let isDragging = false
let dragStartX = 0
let dragStartScroll = 0
let dragMoved = false

function onPointerDown(e) {
  // Только основная кнопка мыши и только мышь
  // (на тач-устройствах нативный скролл/тап работает сам — не вмешиваемся)
  if (e.pointerType !== 'mouse') return
  if (e.button !== 0) return
  isDragging = true
  dragMoved = false
  dragStartX = e.clientX
  dragStartScroll = scrollerRef.value.scrollLeft
  // Класс is-dragging НЕ добавляем здесь — иначе pointer-events: none
  // сразу отключит клик по карточке. Добавим только когда реально потащили.
}

function onPointerMove(e) {
  if (!isDragging) return
  const dx = e.clientX - dragStartX
  if (Math.abs(dx) > 4) {
    if (!dragMoved) {
      dragMoved = true
      scrollerRef.value?.classList.add('is-dragging')
    }
    scrollerRef.value.scrollLeft = dragStartScroll - dx
  }
}

function onPointerUp() {
  if (!isDragging) return
  isDragging = false
  scrollerRef.value.classList.remove('is-dragging')
}

// Если пользователь тянул мышью — гасим клик по карточке,
// чтобы случайно не открыть страницу при попытке полистать.
function onCardClick(e) {
  if (dragMoved) {
    e.preventDefault()
    e.stopPropagation()
    dragMoved = false
  }
}

// ─── Lifecycle ─────────────────────────────────────────
let resizeObs = null

onMounted(async () => {
  await nextTick()
  updateScrollState()

  const el = scrollerRef.value
  if (!el) return

  el.addEventListener('scroll', updateScrollState, { passive: true })
  el.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)

  // Реагируем на изменение размера контейнера (переориентация / resize окна)
  if ('ResizeObserver' in window) {
    resizeObs = new ResizeObserver(updateScrollState)
    resizeObs.observe(el)
  } else {
    window.addEventListener('resize', updateScrollState)
  }
})

onBeforeUnmount(() => {
  const el = scrollerRef.value
  if (el) {
    el.removeEventListener('scroll', updateScrollState)
    el.removeEventListener('pointerdown', onPointerDown)
  }
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  window.removeEventListener('resize', updateScrollState)
  if (resizeObs) resizeObs.disconnect()
})

// При смене items (переход между карточками товара) — пересчитать состояние
// и сбросить позицию скролла к началу.
watch(() => props.items, async () => {
  await nextTick()
  if (scrollerRef.value) scrollerRef.value.scrollLeft = 0
  updateScrollState()
})
</script>

<template>
  <section>
    <div class="wrap">
      <div class="related-head">
        <div>
          <SectionLabel :text="label" />
          <h2 class="related-title">{{ title }}</h2>
        </div>

        <div v-if="isOverflowing" class="related-controls">
          <button
            type="button"
            class="related-arrow"
            :disabled="!canScrollLeft"
            aria-label="Предыдущие"
            @click="scrollByStep(-1)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            class="related-arrow"
            :disabled="!canScrollRight"
            aria-label="Следующие"
            @click="scrollByStep(1)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="related-track">
        <div
          class="related-scroller"
          ref="scrollerRef"
          :class="{ 'no-overflow': !isOverflowing }"
        >
          <RouterLink
            v-for="item in items"
            :key="item.slug"
            :to="`${baseRoute}/${item.slug}`"
            class="catalog-card related-card"
            @click="onCardClick"
          >
            <div class="catalog-img" :class="{ 'has-image': !!item.image }">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.imageAlt || item.title"
                class="catalog-img-photo"
              />
              <div v-else class="catalog-img-label">{{ item.imgLabel }}</div>
            </div>
            <div class="catalog-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description && item.description.length > 110 ? item.description.slice(0, 110) + '…' : item.description }}</p>
              <div v-if="item.price" class="catalog-price">
                {{ item.price }} <span v-if="item.priceNote">{{ item.priceNote }}</span>
              </div>
              <div class="catalog-actions">
                <span class="btn btn-outline btn-sm">Подробнее</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Индикатор позиции — тонкая полоса под скроллером.
           Бегунок шириной 33% едет на (100/33 - 1) ≈ 203% своей ширины,
           чтобы при progress = 1 правый край упирался в правый край дорожки. -->
      <div v-if="isOverflowing" class="related-progress" aria-hidden="true">
        <div
          class="related-progress-bar"
          :style="{ transform: `translateX(${progress * 203}%)` }"
        ></div>
      </div>
    </div>
  </section>
</template>