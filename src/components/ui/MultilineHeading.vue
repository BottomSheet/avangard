<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  level: { type: String, default: 'h2' } // 'h1' | 'h2'
})

const lines = computed(() => props.text.split('\n'))
</script>

<template>
  <component :is="level">
    <template v-for="(line, idx) in lines" :key="idx">
      {{ line }}<br v-if="idx < lines.length - 1" />
    </template>
  </component>
</template>
