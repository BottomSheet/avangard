<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import DeliveryFeature from '@/components/ui/DeliveryFeature.vue'
import StatCard from '@/components/ui/StatCard.vue'
import YandexMap from '@/components/ui/YandexMap.vue'

defineProps({
  data: { type: Object, required: true },
  map: { type: Object, default: null }
})
</script>

<template>
  <section>
    <div class="wrap">
      <div class="delivery-card">
        <div>
          <SectionLabel :text="data.label" />
          <h2>{{ data.title }}</h2>
          <div class="delivery-features">
            <DeliveryFeature
              v-for="feat in data.features"
              :key="feat.title"
              v-bind="feat"
            />
          </div>
        </div>
        <div class="delivery-stats">
          <StatCard
            v-for="stat in data.stats"
            :key="stat.label"
            :num="stat.num"
            :label="stat.label"
          />
        </div>
      </div>

      <div v-if="map" class="delivery-map-block">
        <SectionLabel :text="map.label" />
        <h2>{{ map.title }}</h2>
        <p class="delivery-map-desc">{{ map.description }}</p>
        <YandexMap
          :center="map.center"
          :zoom="map.zoom"
          :points="map.points"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.delivery-map-block {
  margin-top: 80px;
}
.delivery-map-block h2 {
  margin-bottom: 16px;
}
.delivery-map-desc {
  max-width: 600px;
  margin-bottom: 32px;
}
</style>