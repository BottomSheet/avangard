<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'

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

      <div v-if="data.map" class="map-placeholder">
        <div class="map-inner">
          <div class="map-title">{{ data.map.title }}</div>
          <div class="map-pins-row">
            <div
              v-for="pin in data.map.pins"
              :key="pin.label"
              class="map-pin-wrap"
            >
              <div class="map-pin"></div>
              <span class="map-label">{{ pin.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
