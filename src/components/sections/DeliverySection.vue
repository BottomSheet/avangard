<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import DeliveryFeature from '@/components/ui/DeliveryFeature.vue'
import StatCard from '@/components/ui/StatCard.vue'

defineProps({
  data: { type: Object, required: true }
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
    </div>
  </section>
</template>
