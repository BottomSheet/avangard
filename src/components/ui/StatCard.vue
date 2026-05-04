<script setup>
defineProps({
  num: { type: String, required: true },
  label: { type: String, required: true }
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-num">{{ num }}</div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>
