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
  phone: '' // пусто до фокуса — чтобы был виден серый плейсхолдер
})

const errors = reactive({
  name: false,
  phone: false
})

const submitted = ref(false)

/**
 * Форматирует ввод телефона по маске +7 (XXX) XXX-XX-XX
 */
function formatPhone(value) {
  // Берём только цифры
  let digits = value.replace(/\D/g, '')

  // Если пользователь начал ввод с 8 или 7 — отбрасываем,
  // потому что +7 у нас уже зашит в префикс
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1)
  }

  // Ограничиваем 10 цифрами (после +7)
  digits = digits.slice(0, 10)

  // Если цифр нет — возвращаем пустую строку, чтобы был виден placeholder
  if (digits.length === 0) return ''

  // Собираем по маске
  let result = '+7 (' + digits.slice(0, 3)
  if (digits.length >= 4) result += ') ' + digits.slice(3, 6)
  if (digits.length >= 7) result += '-' + digits.slice(6, 8)
  if (digits.length >= 9) result += '-' + digits.slice(8, 10)

  return result
}

function onPhoneInput(e) {
  form.phone = formatPhone(e.target.value)
}

/**
 * Не даём стереть префикс «+7 (» — если каретка влезла в префикс
 * и пользователь жмёт Backspace, ничего не делаем.
 */
function onPhoneKeydown(e) {
  if (e.key === 'Backspace') {
    const start = e.target.selectionStart
    const value = e.target.value
    // Если поле уже содержит только префикс «+7 (» (4 символа) и нет цифр —
    // полностью очищаем поле, чтобы вернулся плейсхолдер
    if (value.length <= 4) {
      e.preventDefault()
      form.phone = ''
    }
  }
}

/**
 * При фокусе на пустое поле — подставляем «+7 (» и ставим курсор в конец,
 * чтобы пользователь сразу начал ввод цифр после префикса.
 */
function onPhoneFocus(e) {
  if (!form.phone) {
    form.phone = '+7 ('
    // ждём, пока Vue обновит DOM
    requestAnimationFrame(() => {
      e.target.setSelectionRange(form.phone.length, form.phone.length)
    })
  }
}

/**
 * При расфокусе — если пользователь не ввёл ни одной цифры (только префикс),
 * очищаем поле, чтобы снова показался серый плейсхолдер.
 */
function onPhoneBlur() {
  if (form.phone === '+7 (' || form.phone === '+7' || form.phone === '+7 ') {
    form.phone = ''
  }
}

function isValidPhone(value) {
  // Должно быть ровно 11 цифр (7 + 10)
  const digits = value.replace(/\D/g, '')
  return digits.length === 11
}

function submit() {
  errors.name = !form.name.trim()
  errors.phone = !isValidPhone(form.phone)
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
          inputmode="tel"
          :value="form.phone"
          :class="{ error: errors.phone }"
          placeholder="+7 (___) ___-__-__"
          @input="onPhoneInput"
          @keydown="onPhoneKeydown"
          @focus="onPhoneFocus"
          @blur="onPhoneBlur"
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
