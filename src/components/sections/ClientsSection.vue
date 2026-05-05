<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ClientCard from '@/components/ui/ClientCard.vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section id="clients">
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <MultilineHeading :text="data.title" level="h2" class="clients-heading" />
      <div class="clients-grid">
        <ClientCard
          v-for="item in data.items"
          :key="item.logoText"
          v-bind="item"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.clients-heading {
  margin-bottom: 48px;
}
</style>
