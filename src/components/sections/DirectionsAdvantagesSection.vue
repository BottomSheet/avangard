<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'
import DirectionAdvantageCard from '@/components/ui/DirectionAdvantageCard.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section id="directions">
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <MultilineHeading :text="data.title" style="margin-bottom: 48px;" />
      <div class="dir-adv-row">
        <DirectionAdvantageCard
          v-for="card in data.cards"
          :key="card.title"
          v-bind="card"
        />
      </div>
    </div>
  </section>
</template>