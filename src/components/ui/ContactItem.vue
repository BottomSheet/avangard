<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  href: { type: String, default: '' }
})
</script>

<template>
  <div class="contact-item">
    <span class="contact-item-label">{{ label }}</span>
    <a v-if="href" :href="href" class="contact-item-val">{{ value }}</a>
    <span v-else class="contact-item-val">{{ value }}</span>
  </div>
</template>
