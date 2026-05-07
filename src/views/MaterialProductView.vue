<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import ProductTopSection from '@/components/sections/ProductTopSection.vue'
import ProductContentSection from '@/components/sections/ProductContentSection.vue'
import RelatedProductsSection from '@/components/sections/RelatedProductsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import { materialProducts } from '@/data/materialProducts'
import { catalog as materialsCatalog } from '@/data/materials'

const route = useRoute()
const router = useRouter()

const product = computed(() => materialProducts[route.params.slug])

// Если slug не найден — редирект на /materials
watch(product, (val) => {
  if (!val) router.replace('/materials')
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
// чтобы информация в «Смотрите также» всегда совпадала с тем, что на /materials.
// Правишь в одном месте (materials.js → catalog.items) — обновляется и там и тут.
const relatedItems = computed(() => {
  if (!product.value) return []
  return materialsCatalog.items.filter(item => item.slug !== product.value.slug)
})

const contactData = computed(() => {
  if (!product.value) return null
  return {
    label: 'Контакты',
    title: product.value.contactTitle,
    formId: `formProd-${product.value.slug}`,
    formTitle: product.value.formTitle,
    formSubtitle: product.value.formSubtitle,
    showAddress: false,
    scheduleField: 'default'
  }
})
</script>

<template>
  <template v-if="product">
    <Breadcrumbs :items="breadcrumbs" />
    <ProductTopSection :data="product" />
    <AppHr />
    <ProductContentSection :data="product" kind="material" />
    <AppHr v-if="relatedItems.length" />
    <RelatedProductsSection
      v-if="relatedItems.length"
      :items="relatedItems"
      kind="material"
      label="Похожие материалы"
      title="Смотрите также"
    />
    <AppHr />
    <ContactSection :data="contactData" />
  </template>
</template>
