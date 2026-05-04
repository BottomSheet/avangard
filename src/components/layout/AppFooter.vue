<script setup>
import { company } from '@/data/site'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-logo">{{ company.name }}</div>
      <div class="footer-copy">
        © {{ company.copyrightYear }} {{ company.legalName }}. Все права защищены.
      </div>
    </div>
  </footer>
</template>
