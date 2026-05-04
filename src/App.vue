<script setup>
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useReveal } from '@/composables/useReveal'

useReveal()
</script>

<template>
  <AppNav />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
