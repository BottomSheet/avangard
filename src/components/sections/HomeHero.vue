<script setup>
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'
import HeroDirection from '@/components/ui/HeroDirection.vue'

defineProps({
  data: { type: Object, required: true },
  directions: { type: Array, required: true }
})

const router = useRouter()

/**
 * Обработчик клика по кнопкам hero.
 * Важно: в проекте используется createWebHashHistory, поэтому обычный
 * <a href="#contact"> ломает hash-роутер (URL /#contact вместо /#/ → catch-all → редирект на /).
 * Здесь: если секция #contact / #about есть на текущей странице — плавный скролл к ней;
 * если нет (мы на другой странице) — переход на главную и потом скролл.
 */
async function handleAction(href) {
  // href вида '#contact', '#about'
  const id = href.startsWith('#') ? href.slice(1) : href

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  // секции нет на этой странице — идём на главную, ждём рендер, скроллим
  await router.push('/')
  await nextTick()
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>

<template>
  <section class="hero">
    <!-- Базовый тёмный фон -->
    <div class="hero-bg"></div>

    <!-- Мобильная картинка Hero — показывается только на ≤768px через CSS.
         Если data.imageMobile не задан, элемент не рендерится. -->
    <div
      v-if="data.imageMobile"
      class="hero-media-mobile"
      :style="{ backgroundImage: `url(${data.imageMobile})` }"
      aria-hidden="true"
    ></div>

    <div class="hero-pattern"></div>
    <div class="hero-content">
      <div class="hero-eyebrow">{{ data.eyebrow }}</div>
      <MultilineHeading level="h1" :text="data.title" />
      <p>{{ data.description }}</p>

      <div class="hero-actions">
        <a
          v-for="action in data.actions"
          :key="action.label"
          :href="action.href"
          class="btn btn-outline-white"
          @click.prevent="handleAction(action.href)"
        >
          {{ action.label }}
        </a>
      </div>

      <div class="hero-dirs">
        <HeroDirection
          v-for="dir in directions"
          :key="dir.num"
          v-bind="dir"
        />
      </div>
    </div>
  </section>
</template>
