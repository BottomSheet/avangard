<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: { type: Object, required: true }
})

const activeThumb = ref(0)
</script>

<template>
  <section class="product-top no-reveal">
    <div class="wrap">
      <div class="product-grid">
        <!-- Галерея -->
        <div class="product-gallery">
          <div class="product-main-img">
            <div class="product-main-img-label">{{ data.photoLabel }}</div>
          </div>
          <div class="product-thumbs">
            <div
              v-for="i in data.thumbsCount"
              :key="i"
              class="product-thumb"
              :class="{ active: activeThumb === i - 1 }"
              @click="activeThumb = i - 1"
            ></div>
          </div>
        </div>

        <!-- Инфо -->
        <div class="product-info">
          <div class="product-info-eyebrow">{{ data.eyebrow }}</div>
          <h1>{{ data.title }}</h1>
          <p class="product-info-tagline">{{ data.tagline }}</p>

          <div class="product-quick">
            <div v-for="q in data.quick" :key="q.label" class="quick-item">
              <div class="quick-item-label">{{ q.label }}</div>
              <div class="quick-item-val">{{ q.value }}</div>
            </div>
          </div>

          <div class="product-price-row">
            <div>
              <div class="product-price-label">Цена</div>
              <div class="product-price-val">
                {{ data.price.value }} <small>{{ data.price.note }}</small>
              </div>
            </div>
            <div style="text-align: right;">
              <div class="product-price-label">Минимальный заказ</div>
              <div class="product-price-val is-min">{{ data.minOrder }}</div>
            </div>
          </div>

          <div class="product-actions">
            <a href="#contact" class="btn btn-dark">Оформить заявку</a>
            <a href="tel:+70000000000" class="btn btn-outline">Позвонить</a>
          </div>

          <div class="product-meta-list">
            <div v-for="(meta, idx) in data.metaList" :key="idx">{{ meta }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
