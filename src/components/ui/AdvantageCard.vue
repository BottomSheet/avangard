<script setup>
defineProps({
  num: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<template>
  <div class="adv-card">
    <div class="adv-num">{{ num }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>
