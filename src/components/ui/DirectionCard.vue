<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  to: { type: String, required: true }
})
</script>

<template>
  <RouterLink :to="to" class="dir-card">
    <div class="dir-card-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="dir-card-link">Подробнее →</div>
  </RouterLink>
</template>
