<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import WorkCard from '@/components/ui/WorkCard.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <h2 style="margin-bottom: 48px;">{{ data.title }}</h2>
      <div class="works-grid">
        <WorkCard
          v-for="item in data.items"
          :key="item.title"
          v-bind="item"
        />
      </div>
    </div>
  </section>
</template>
