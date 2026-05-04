<script setup>
defineProps({
  imgLabel: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, default: '' },
  priceNote: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Заказать' },
  ctaHref: { type: String, default: '#contact' }
})
</script>

<template>
  <div class="catalog-card">
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
