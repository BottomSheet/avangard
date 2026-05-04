<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ProcessStep from '@/components/ui/ProcessStep.vue'

defineProps({
  data: { type: Object, required: true }
})
</script>

<template>
  <section>
    <div class="wrap">
      <SectionLabel :text="data.label" />
      <h2 style="margin-bottom: 48px;">{{ data.title }}</h2>
      <div class="process-steps">
        <ProcessStep
          v-for="step in data.steps"
          :key="step.num"
          v-bind="step"
        />
      </div>
    </div>
  </section>
</template>
