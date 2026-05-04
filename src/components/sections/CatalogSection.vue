<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import CatalogCard from '@/components/ui/CatalogCard.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <h2 style="margin-bottom: 48px;">{{ data.title }}</h2>
      <div class="catalog-grid">
        <CatalogCard
          v-for="item in data.items"
          :key="item.title"
          v-bind="item"
          :cta-label="data.ctaLabel"
        />
      </div>
    </div>
  </section>
</template>
