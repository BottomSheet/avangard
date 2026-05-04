<script setup>
defineProps({
  text: { type: String, required: true }
})
</script>

<template>
  <div class="section-label">{{ text }}</div>
</template>
