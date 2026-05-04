<script setup>
import MultilineHeading from '@/components/ui/MultilineHeading.vue'
import HeroDirection from '@/components/ui/HeroDirection.vue'

defineProps({
  data: { type: Object, required: true },
  directions: { type: Array, required: true }
})
</script>

<template>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-pattern"></div>
    <div class="hero-content">
      <div class="hero-eyebrow">{{ data.eyebrow }}</div>
      <MultilineHeading level="h1" :text="data.title" />
      <p>{{ data.description }}</p>

      <div class="hero-actions">
        <a
          v-for="action in data.actions"
          :key="action.label"
          :href="action.href"
          class="btn btn-outline-white"
        >
          {{ action.label }}
        </a>
      </div>

      <div class="hero-dirs">
        <HeroDirection
          v-for="dir in directions"
          :key="dir.num"
          v-bind="dir"
        />
      </div>
    </div>
  </section>
</template>
