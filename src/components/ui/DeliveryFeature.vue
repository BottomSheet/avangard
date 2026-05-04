<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<template>
  <div class="delivery-feat">
    <div class="delivery-feat-dot"></div>
    <div class="delivery-feat-text">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
