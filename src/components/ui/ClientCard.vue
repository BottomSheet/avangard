<script setup>
defineProps({
  logoText: { type: String, required: true },
  logoSub: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<template>
  <div class="client-card">
    <div class="client-logo">
      <div class="client-logo-text">
        {{ logoText }}<small v-if="logoSub">{{ logoSub }}</small>
      </div>
    </div>
    <div class="client-info">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
