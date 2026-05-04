<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import MultilineHeading from '@/components/ui/MultilineHeading.vue'
import WhyItem from '@/components/ui/WhyItem.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <MultilineHeading :text="data.title" style="margin-bottom: 48px;" />
      <div class="why-grid">
        <WhyItem
          v-for="item in data.items"
          :key="item.title"
          v-bind="item"
        />
      </div>
    </div>
  </section>
</template>
