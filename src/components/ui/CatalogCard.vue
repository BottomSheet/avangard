<script setup>
import { computed, nextTick } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
  // Поддержка картинки (рекомендуемый вариант)
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  // Текстовый плейсхолдер (используется, если нет картинки)
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
    <div class="catalog-img" :class="{ 'has-image': image }">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || title"
        class="catalog-img-photo"
      />
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
    <div class="catalog-img" :class="{ 'has-image': image }">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || title"
        class="catalog-img-photo"
      />
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
