<script setup>
import HomeHero from '@/components/sections/HomeHero.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import DirectionsAdvantagesSection from '@/components/sections/DirectionsAdvantagesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppHr from '@/components/ui/AppHr.vue'

import {
  hero,
  heroDirections,
  aboutSection,
  directionsAndAdvantages,
  homeContact
} from '@/data/home'
</script>

<template>
  <HomeHero :data="hero" :directions="heroDirections" />
  <AboutSection :data="aboutSection" />
  <AppHr />
  <DirectionsAdvantagesSection :data="directionsAndAdvantages" />
  <AppHr />
  <ContactSection :data="homeContact" />
</template>
