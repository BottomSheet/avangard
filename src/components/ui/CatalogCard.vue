<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  imgLabel: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, default: '' },
  priceNote: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Заказать' },
  ctaHref: { type: String, default: '#contact' },
  // Если задан — карточка ведёт на детальную страницу
  to: { type: [String, Object], default: null }
})

// Тег обёртки: <RouterLink> если есть to, иначе <div>
const isLink = computed(() => !!props.to)
</script>

<template>
  <RouterLink v-if="isLink" :to="to" class="catalog-card">
    <div class="catalog-img">
      <div class="catalog-img-label">{{ imgLabel }}</div>
    </div>
    <div class="catalog-body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div v-if="price" class="catalog-price">
        {{ price }} <span v-if="priceNote">{{ priceNote }}</span>
      </div>
      <span class="btn btn-outline btn-sm">Подробнее</span>
    </div>
  </RouterLink>

  <div v-else class="catalog-card">
    <div class="catalog-img">
      <div class="catalog-img-label">{{ imgLabel }}</div>
    </div>
    <div class="catalog-body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div v-if="price" class="catalog-price">
        {{ price }} <span v-if="priceNote">{{ priceNote }}</span>
      </div>
      <a :href="ctaHref" class="btn btn-outline btn-sm">{{ ctaLabel }}</a>
    </div>
  </div>
</template>
