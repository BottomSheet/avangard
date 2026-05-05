<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import ProductTopSection from '@/components/sections/ProductTopSection.vue'
import ProductContentSection from '@/components/sections/ProductContentSection.vue'
import RelatedProductsSection from '@/components/sections/RelatedProductsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import { equipmentProducts } from '@/data/equipmentProducts'

const route = useRoute()
const router = useRouter()

const product = computed(() => equipmentProducts[route.params.slug])

// Если slug не найден — редирект на /equipment
watch(product, (val) => {
  if (!val) router.replace('/equipment')
}, { immediate: true })

const breadcrumbs = computed(() => {
  if (!product.value) return []
  return [
    { to: '/', label: 'Главная' },
    product.value.breadcrumbParent,
    { label: product.value.title }
  ]
})

const relatedItems = computed(() => {
  if (!product.value) return []
  return Object.values(equipmentProducts)
    .filter(item => item.slug !== product.value.slug)
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
    scheduleField: 'equipment'
  }
})
</script>

<template>
  <template v-if="product">
    <Breadcrumbs :items="breadcrumbs" />
    <ProductTopSection :data="product" />
    <AppHr />
    <ProductContentSection :data="product" kind="equipment" />
    <AppHr v-if="relatedItems.length" />
    <RelatedProductsSection
      v-if="relatedItems.length"
      :items="relatedItems"
      kind="equipment"
      label="Другая техника"
      title="Смотрите также"
    />
    <AppHr />
    <ContactSection :data="contactData" />
  </template>
</template>
