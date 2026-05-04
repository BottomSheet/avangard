<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'
import YandexMap from '@/components/ui/YandexMap.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <MultilineHeading :text="data.title" style="margin-bottom: 48px;" />

      <div class="gallery-grid">
        <div
          v-for="(item, idx) in data.items"
          :key="idx"
          class="gallery-item"
          :class="{ 'gallery-item-large': item.large }"
        >
          <div class="gallery-label">{{ item.label }}</div>
        </div>
      </div>

      <div v-if="data.points && data.points.length" class="gallery-map-block">
        <h3 class="gallery-map-title">Объекты на карте</h3>
        <p class="gallery-map-desc">
          Нажмите на точку, чтобы построить маршрут в Яндекс.Навигаторе или Яндекс.Картах.
        </p>
        <YandexMap
          :center="data.center"
          :zoom="data.zoom"
          :points="data.points"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-map-block {
  margin-top: 48px;
}
.gallery-map-title {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 8px;
}
.gallery-map-desc {
  max-width: 600px;
  margin-bottom: 24px;
  color: var(--mid);
}
</style>
