<script setup>
import { computed } from 'vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ContactItem from '@/components/ui/ContactItem.vue'
import ContactForm from '@/components/ui/ContactForm.vue'
import { contacts } from '@/data/site'

const props = defineProps({
  data: { type: Object, required: true }
  // {
  //   label, title,
  //   formTitle, formSubtitle,
  //   showAddress: Boolean,
  //   scheduleField: 'default' | 'equipment'
  // }
})

const scheduleValue = computed(() =>
  props.data.scheduleField === 'equipment'
    ? contacts.scheduleEquipment
    : contacts.schedule
)
</script>

<template>
  <section class="contact-section" id="contact">
    <div class="wrap">
      <div class="contact-grid">
        <div>
          <SectionLabel :text="data.label" />
          <h2>{{ data.title }}</h2>
          <div class="contact-details">
            <ContactItem
              label="Телефон"
              :value="contacts.phone"
              :href="`tel:${contacts.phoneLink}`"
            />
            <ContactItem
              label="Email"
              :value="contacts.email"
              :href="`mailto:${contacts.email}`"
            />
            <ContactItem
              v-if="data.showAddress"
              label="Адрес"
              :value="contacts.address"
            />
            <ContactItem
              label="Режим работы"
              :value="scheduleValue"
            />
          </div>
        </div>
        <div>
          <ContactForm
            :title="data.formTitle"
            :subtitle="data.formSubtitle"
          />
        </div>
      </div>
    </div>
  </section>
</template>
