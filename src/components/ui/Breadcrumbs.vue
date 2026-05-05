<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  // [{ to: '/materials', label: 'Сыпучие материалы' }, ..., { label: 'Текущая' }]
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="wrap">
    <nav class="breadcrumbs" aria-label="breadcrumbs">
      <ul>
        <li v-for="(item, idx) in items" :key="idx">
          <RouterLink v-if="item.to && idx < items.length - 1" :to="item.to">
            {{ item.label }}
          </RouterLink>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>
