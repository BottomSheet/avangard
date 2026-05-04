<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  to: { type: String, required: true },
  num: { type: String, required: true },
  advantage: { type: String, required: true },
  advantageDescription: { type: String, required: true }
})
</script>

<template>
  <RouterLink :to="to" class="dir-card">
    <div class="dir-card-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="dir-card-divider"></div>
    <div class="adv-num">{{ num }}</div>
    <h4 class="dir-card-adv-title">{{ advantage }}</h4>
    <p class="dir-card-adv-desc">{{ advantageDescription }}</p>
    <div class="dir-card-link">Подробнее →</div>
  </RouterLink>
</template>

<style scoped>
.dir-card p {
  color: rgba(255, 255, 255, 1);
}
.dir-card-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 8px 0;
}

.dir-card-adv-title {
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.dir-card-adv-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.65;
}
</style>