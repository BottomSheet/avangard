<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import ProductTopSection from '@/components/sections/ProductTopSection.vue'
import ProductContentSection from '@/components/sections/ProductContentSection.vue'
import RelatedProductsSection from '@/components/sections/RelatedProductsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import { serviceProducts } from '@/data/serviceProducts'
import { catalog as servicesCatalog } from '@/data/services'

const route = useRoute()
const router = useRouter()

const product = computed(() => serviceProducts[route.params.slug])

watch(product, (val) => {
  if (!val) router.replace('/services')
}, { immediate: true })

const breadcrumbs = computed(() => {
  if (!product.value) return []
  return [
    { to: '/', label: 'Главная' },
    product.value.breadcrumbParent,
    { label: product.value.title }
  ]
})

// Берём остальные товары из ТОГО ЖЕ каталога главной страницы раздела —
// чтобы информация в «Смотрите также» всегда совпадала с тем, что на /services.
// Правишь в одном месте (services.js → catalog.items) — обновляется и там и тут.
const relatedItems = computed(() => {
  if (!product.value) return []
  return servicesCatalog.items.filter(item => item.slug !== product.value.slug)
})

const contactData = computed(() => {
  if (!product.value) return null
  return {
    label: 'Контакты',
    title: product.value.contactTitle,
    formId: `formProd-${product.value.slug}`,
    formTitle: product.value.formTitle,
    formSubtitle: product.value.formSubtitle,
    showAddress: true,
    scheduleField: 'default'
  }
})
</script>

<template>
  <template v-if="product">
    <Breadcrumbs :items="breadcrumbs" />
    <ProductTopSection :data="product" />
    <AppHr />
    <ProductContentSection :data="product" kind="service" />
    <AppHr v-if="relatedItems.length" />
    <RelatedProductsSection
      v-if="relatedItems.length"
      :items="relatedItems"
      kind="service"
      label="Другие услуги"
      title="Смотрите также"
    />
    <AppHr />
    <ContactSection :data="contactData" />
  </template>
</template>
