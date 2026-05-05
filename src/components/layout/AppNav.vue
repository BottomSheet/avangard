<script setup>
import { ref, nextTick, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { company, navLinks } from '@/data/site'
import { useScrolled } from '@/composables/useScrolled'

const { scrolled } = useScrolled(40)
const route = useRoute()

// На страницах без тёмного hero-блока (карточки товара) шапка всегда в scrolled-виде,
// иначе белый текст шапки сливается со светлым фоном страницы.
const forceScrolled = computed(() => {
  return route.name === 'material-product' || route.name === 'equipment-product'
})

const navScrolled = computed(() => scrolled.value || forceScrolled.value)

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

const router = useRouter()

async function goToContact() {
  closeMenu()
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  // секции нет на этой странице — идём на главную, ждём рендер, скроллим
  await router.push('/')
  await nextTick()
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>

<template>
  <nav class="app-nav" :class="{ 'nav-scrolled': navScrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo">{{ company.name }}</RouterLink>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink :to="link.to" @click="closeMenu" exact-active-class="active">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <a href="#contact" class="btn nav-cta" @click.prevent="goToContact">Оставить заявку</a>

      <div class="burger" :class="{ open: menuOpen }" @click="toggleMenu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
</template>
