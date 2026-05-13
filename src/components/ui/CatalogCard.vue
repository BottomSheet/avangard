<script setup>
import { computed, nextTick, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
  // Одиночная картинка (старый интерфейс, оставлен для совместимости)
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  // Массив картинок для карусели — приоритетнее, чем `image`
  images: { type: Array, default: () => [] },
  // Текстовый плейсхолдер (используется, если нет картинок)
  imgLabel: { type: String, default: '' },
  // Контент карточки
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, default: '' },
  priceNote: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Заказать' },
  ctaHref: { type: String, default: '#contact' },
  to: { type: [String, Object], default: null }
})

const isLink = computed(() => !!props.to)
const router = useRouter()

// Список фото для слайдера. Если переданы images — берём их,
// иначе пробуем сделать массив из одиночной image.
const slides = computed(() => {
  if (Array.isArray(props.images) && props.images.length) {
    // Поддерживаем как массив строк, так и массив объектов { src, alt }
    return props.images.map((it, i) => {
      if (typeof it === 'string') return { src: it, alt: props.imageAlt || `${props.title} — фото ${i + 1}` }
      return { src: it.src, alt: it.alt || props.imageAlt || `${props.title} — фото ${i + 1}` }
    })
  }
  if (props.image) return [{ src: props.image, alt: props.imageAlt || props.title }]
  return []
})

const hasSlider = computed(() => slides.value.length > 1)
const currentIndex = ref(0)

function nextSlide(e) {
  e?.preventDefault?.()
  e?.stopPropagation?.()
  if (!slides.value.length) return
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

function prevSlide(e) {
  e?.preventDefault?.()
  e?.stopPropagation?.()
  if (!slides.value.length) return
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(idx, e) {
  e?.preventDefault?.()
  e?.stopPropagation?.()
  currentIndex.value = idx
}

async function goToContact() {
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  await router.push('/')
  await nextTick()
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>

<template>
  <!-- Вариант 1: Карточка — ссылка на детальную страницу -->
  <RouterLink v-if="isLink" :to="to" class="catalog-card">
    <div class="catalog-img" :class="{ 'has-image': slides.length }">
      <template v-if="slides.length">
        <img
          v-for="(s, idx) in slides"
          :key="idx"
          :src="s.src"
          :alt="s.alt"
          class="catalog-img-photo catalog-slide"
          :class="{ 'is-active': idx === currentIndex }"
        />

        <!-- Стрелки -->
        <button
          v-if="hasSlider"
          type="button"
          class="catalog-arrow catalog-arrow--prev"
          aria-label="Предыдущее фото"
          @click="prevSlide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          v-if="hasSlider"
          type="button"
          class="catalog-arrow catalog-arrow--next"
          aria-label="Следующее фото"
          @click="nextSlide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Прогресс-бар -->
        <div v-if="hasSlider" class="catalog-progress" @click.prevent.stop>
          <button
            v-for="(s, idx) in slides"
            :key="idx"
            type="button"
            class="catalog-progress-item"
            :class="{ 'is-active': idx === currentIndex }"
            :aria-label="`Фото ${idx + 1} из ${slides.length}`"
            @click="goToSlide(idx, $event)"
          ></button>
        </div>
      </template>
      <div v-else class="catalog-img-label">{{ imgLabel }}</div>
    </div>
    <div class="catalog-body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>

      <div v-if="price" class="catalog-price">
        {{ price }} <span v-if="priceNote">{{ priceNote }}</span>
      </div>

      <div class="catalog-actions">
        <span class="btn btn-outline btn-sm">Подробнее</span>
        <a
          href="#contact"
          class="btn btn-dark btn-sm"
          @click.stop.prevent="goToContact"
        >
          Заказать
        </a>
      </div>
    </div>
  </RouterLink>

  <!-- Вариант 2: Обычная карточка -->
  <div v-else class="catalog-card">
    <div class="catalog-img" :class="{ 'has-image': slides.length }">
      <template v-if="slides.length">
        <img
          v-for="(s, idx) in slides"
          :key="idx"
          :src="s.src"
          :alt="s.alt"
          class="catalog-img-photo catalog-slide"
          :class="{ 'is-active': idx === currentIndex }"
        />

        <button
          v-if="hasSlider"
          type="button"
          class="catalog-arrow catalog-arrow--prev"
          aria-label="Предыдущее фото"
          @click="prevSlide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          v-if="hasSlider"
          type="button"
          class="catalog-arrow catalog-arrow--next"
          aria-label="Следующее фото"
          @click="nextSlide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div v-if="hasSlider" class="catalog-progress" @click.prevent.stop>
          <button
            v-for="(s, idx) in slides"
            :key="idx"
            type="button"
            class="catalog-progress-item"
            :class="{ 'is-active': idx === currentIndex }"
            :aria-label="`Фото ${idx + 1} из ${slides.length}`"
            @click="goToSlide(idx, $event)"
          ></button>
        </div>
      </template>
      <div v-else class="catalog-img-label">{{ imgLabel }}</div>
    </div>
    <div class="catalog-body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>

      <div v-if="price" class="catalog-price">
        {{ price }} <span v-if="priceNote">{{ priceNote }}</span>
      </div>

      <div class="catalog-actions">
        <span class="btn btn-outline btn-sm">Подробнее</span>
        <a
          href="#contact"
          class="btn btn-dark btn-sm"
          @click.stop.prevent="goToContact"
        >
          Заказать
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Слайды ──────────────────────────────────────── */
.catalog-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.catalog-slide.is-active {
  opacity: 1;
  pointer-events: auto;
}

/* ── Стрелки ─────────────────────────────────────── */
.catalog-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.catalog-card:hover .catalog-arrow,
.catalog-arrow:focus-visible {
  opacity: 1;
}
.catalog-arrow:hover {
  background: #fff;
}
.catalog-arrow--prev { left: 10px; }
.catalog-arrow--next { right: 10px; }

/* На тач-устройствах показываем стрелки всегда — hover недоступен */
@media (hover: none) {
  .catalog-arrow { opacity: 1; }
}

/* ── Прогресс-бар ────────────────────────────────── */
.catalog-progress {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 10px;
  display: flex;
  gap: 4px;
  z-index: 4;
}
.catalog-progress-item {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}
.catalog-progress-item.is-active {
  background: #fff;
}
.catalog-progress-item:hover {
  background: rgba(255, 255, 255, 0.85);
}

@media (max-width: 720px) {
  .catalog-arrow {
    width: 30px;
    height: 30px;
  }
  .catalog-arrow--prev { left: 6px; }
  .catalog-arrow--next { right: 6px; }
  .catalog-progress {
    left: 8px;
    right: 8px;
    bottom: 6px;
  }
}
</style>
