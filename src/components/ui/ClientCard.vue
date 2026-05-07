<script setup>
defineProps({
  // Картинка-логотип (рекомендуемый вариант)
  logo: { type: String, default: '' },
  logoAlt: { type: String, default: '' },
  // Если у логотипа много "воздуха" вокруг (как у Владстандарта) — ставим true,
  // чтобы картинка занимала весь блок без полей.
  logoFill: { type: Boolean, default: false },
  // Текстовый логотип (используется, если нет картинки)
  logoText: { type: String, default: '' },
  logoSub: { type: String, default: '' },
  // Информация о клиенте
  title: { type: String, default: '' },
  description: { type: String, required: true }
})
</script>

<template>
  <div class="client-card">
    <div class="client-logo" :class="{ 'client-logo--fill': logoFill }">
      <!-- Если есть картинка-логотип — показываем её -->
      <img
        v-if="logo"
        :src="logo"
        :alt="logoAlt || title || 'Логотип клиента'"
        class="client-logo-img"
      />
      <!-- Иначе fallback на текстовый логотип -->
      <div v-else class="client-logo-text">
        {{ logoText }}<small v-if="logoSub">{{ logoSub }}</small>
      </div>
    </div>
    <div class="client-info">
      <h3 v-if="title">{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.client-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* Лёгкая обработка под монохромный стиль сайта.
     Если хочешь, чтобы лого были цветными — удали следующие 3 строки. */
  filter: grayscale(100%);
  opacity: 0.85;
  transition: filter 0.2s, opacity 0.2s;
}

/* Режим для логотипов с большим количеством "воздуха" вокруг (Владстандарт):
   убираем внутренние отступы и масштабируем картинку, чтобы заполнить блок */
.client-logo--fill {
  padding: 0;
}
.client-logo--fill .client-logo-img {
  transform: scale(1.35);
}

.client-card:hover .client-logo-img {
  filter: grayscale(0);
  opacity: 1;
}
</style>
