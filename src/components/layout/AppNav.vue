<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { company, navLinks } from '@/data/site'
import { useScrolled } from '@/composables/useScrolled'

const { scrolled } = useScrolled(40)
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <nav class="app-nav" :class="{ 'nav-scrolled': scrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo">{{ company.name }}</RouterLink>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink :to="link.to" @click="closeMenu" exact-active-class="active">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <a href="#contact" class="btn nav-cta">Оставить заявку</a>

      <div class="burger" @click="toggleMenu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
</template>
