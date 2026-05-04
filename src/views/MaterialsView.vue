<script setup>
import PageHero from '@/components/sections/PageHero.vue'
import WhyUsSection from '@/components/sections/WhyUsSection.vue'
import CatalogSection from '@/components/sections/CatalogSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import DeliverySection from '@/components/sections/DeliverySection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import {
  pageHero,
  whyUs,
  catalog,
  process,
  delivery,
  gallery,
  contact
} from '@/data/materials'
</script>

<template>
  <PageHero :data="pageHero" />
  <WhyUsSection :data="whyUs" />
  <AppHr />
  <CatalogSection :data="catalog" />
  <AppHr />
  <ProcessSection :data="process" />
  <AppHr />
  <DeliverySection :data="delivery" />
  <AppHr />
  <GallerySection :data="gallery" />
  <AppHr />
  <ContactSection :data="contact" />
</template>
