<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  num: { type: String, required: true },
  title: { type: String, required: true },
  sub: { type: String, required: true },
  to: { type: String, required: true }
})
</script>

<template>
  <RouterLink :to="to" class="hero-dir">
    <div class="hero-dir-num">{{ num }}</div>
    <div class="hero-dir-title">{{ title }}</div>
    <div class="hero-dir-sub">{{ sub }}</div>
  </RouterLink>
</template>
