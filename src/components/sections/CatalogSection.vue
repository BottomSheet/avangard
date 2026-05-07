<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import CatalogCard from '@/components/ui/CatalogCard.vue'

defineProps({
  data: { type: Object, required: true }
  // {
  //   label, title, ctaLabel,
  //   basePath?: '/materials' | '/equipment' (если задан — карточки ведут на детальные страницы),
  //   items: [{ slug?, imgLabel, title, description, price, priceNote }]
  // }
})

/**
 * Если у каталога указан basePath и у элемента есть slug — карточка превращается
 * в RouterLink на детальную страницу. Иначе ведёт на #contact (старое поведение).
 */
function buildTo(item, basePath) {
  if (basePath && item.slug) return `${basePath}/${item.slug}`
  return null
}
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <h2 style="margin-bottom: 48px;">{{ data.title }}</h2>
      <div class="catalog-grid">
        <CatalogCard
          v-for="item in data.items"
          :key="item.slug || item.title"
          v-bind="item"
          :cta-label="data.ctaLabel"
          :to="buildTo(item, data.basePath)"
        />
      </div>
    </div>
  </section>
</template>
