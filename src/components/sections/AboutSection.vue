<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import StatCard from '@/components/ui/StatCard.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section id="about">
    <div class="wrap">
      <div class="about-grid">
        <div>
          <SectionLabel :text="data.label" />
          <h2>{{ data.title }}</h2>
          <div class="about-stats">
            <StatCard
              v-for="stat in data.stats"
              :key="stat.label"
              :num="stat.num"
              :label="stat.label"
            />
          </div>
        </div>
        <div class="about-text">
          <p v-for="(p, idx) in data.paragraphs" :key="idx">{{ p }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
