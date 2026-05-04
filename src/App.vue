<script setup>
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppNav />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
