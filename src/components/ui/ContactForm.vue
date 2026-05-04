<script setup>
import { ref, reactive } from 'vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  successText: {
    type: String,
    default: 'Мы свяжемся с вами в течение часа'
  }
})

const form = reactive({
  name: '',
  phone: ''
})

const errors = reactive({
  name: false,
  phone: false
})

const submitted = ref(false)

function submit() {
  errors.name = !form.name.trim()
  errors.phone = !form.phone.trim()
  if (errors.name || errors.phone) return

  // тут будет реальная отправка на бэк
  submitted.value = true
}
</script>

<template>
  <div class="form-card">
    <template v-if="!submitted">
      <h3>{{ title }}</h3>
      <p v-if="subtitle">{{ subtitle }}</p>

      <div class="form-group">
        <label>Ваше имя</label>
        <input
          type="text"
          v-model="form.name"
          :class="{ error: errors.name }"
          placeholder="Иван Иванов"
        />
      </div>

      <div class="form-group">
        <label>Телефон</label>
        <input
          type="tel"
          v-model="form.phone"
          :class="{ error: errors.phone }"
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <button class="form-btn" @click="submit">Отправить заявку</button>

      <div class="form-note">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </div>
    </template>

    <div v-else class="form-success">
      <div class="form-success-icon">✓</div>
      <h4>Заявка отправлена</h4>
      <p>{{ successText }}</p>
    </div>
  </div>
</template>
