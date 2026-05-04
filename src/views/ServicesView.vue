<script setup>
import PageHero from '@/components/sections/PageHero.vue'
import WhyUsSection from '@/components/sections/WhyUsSection.vue'
import CatalogSection from '@/components/sections/CatalogSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import {
  pageHero,
  whyUs,
  catalog,
  contact
} from '@/data/services'
</script>

<template>
  <PageHero :data="pageHero" />
  <WhyUsSection :data="whyUs" />
  <AppHr />
  <CatalogSection :data="catalog" />
  <AppHr />
  <ContactSection :data="contact" />
</template>
