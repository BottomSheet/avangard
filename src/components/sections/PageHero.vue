<script setup>
import MultilineHeading from '@/components/ui/MultilineHeading.vue'

defineProps({
  data: { type: Object, required: true }
  // { eyebrow, title, description }
})
</script>

<template>
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-pattern"></div>
    <div class="page-hero-content">
      <div class="hero-eyebrow">{{ data.eyebrow }}</div>
      <MultilineHeading level="h1" :text="data.title" />
      <p>{{ data.description }}</p>
    </div>
  </section>
</template>
