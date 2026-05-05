<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const props = defineProps({
  items: { type: Array, required: true },
  kind: { type: String, default: 'material' },
  label: { type: String, default: 'Похожие товары' },
  title: { type: String, default: 'Смотрите также' }
})

const baseRoute = computed(() => props.kind === 'equipment' ? '/equipment' : '/materials')
</script>

<template>
  <section>
    <div class="wrap">
      <div class="related-head">
        <SectionLabel :text="label" />
        <h2 class="related-title">{{ title }}</h2>
      </div>

      <div class="related-track">
        <div class="related-scroller">
          <RouterLink
            v-for="item in items"
            :key="item.slug"
            :to="`${baseRoute}/${item.slug}`"
            class="catalog-card related-card"
          >
            <div class="catalog-img">
              <div class="catalog-img-label">{{ item.photoLabel }}</div>
            </div>
            <div class="catalog-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.tagline.length > 110 ? item.tagline.slice(0, 110) + '…' : item.tagline }}</p>
              <div class="catalog-price">
                {{ item.price.value }} <span>{{ item.price.note }}</span>
              </div>
              <span class="btn btn-outline btn-sm">Подробнее</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>