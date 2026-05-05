<script setup>
import { nextTick } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { company, contacts, footerNav } from '@/data/site'

const router = useRouter()

/**
 * Обработка клика по footer-ссылке.
 * Если ссылка вида '/#anchor' — переходим на главную и скроллим к якорю.
 * Если '#anchor' — скроллим в текущей странице.
 * Обычные роуты — пропускаем (router-link отрабатывает сам).
 */
async function handleFooterLink(e, to) {
  // Внутренние якоря на главной
  if (to === '/' || to.startsWith('/#')) {
    const hash = to.includes('#') ? to.slice(to.indexOf('#') + 1) : ''
    if (hash) {
      e.preventDefault()
      const onHome = router.currentRoute.value.path === '/'
      if (!onHome) {
        await router.push('/')
        await nextTick()
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  // Заглушки '#'
  if (to === '#') {
    e.preventDefault()
  }
}
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <!-- Бренд -->
        <div class="footer-brand">
          <div class="footer-logo">{{ company.name }}</div>
          <p>{{ company.tagline }}</p>
        </div>

        <!-- Направления -->
        <div class="footer-col">
          <div class="footer-col-title">{{ footerNav.directions.title }}</div>
          <ul>
            <li v-for="link in footerNav.directions.links" :key="link.label">
              <RouterLink
                :to="link.to"
                @click="handleFooterLink($event, link.to)"
              >{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Информация -->
        <div class="footer-col">
          <div class="footer-col-title">{{ footerNav.info.title }}</div>
          <ul>
            <li v-for="link in footerNav.info.links" :key="link.label">
              <a :href="link.to" @click="handleFooterLink($event, link.to)">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Контакты -->
        <div class="footer-col">
          <div class="footer-col-title">Контакты</div>
          <div class="footer-contact-item">
            <span>Телефон</span>
            <a :href="`tel:${contacts.phoneLink}`">{{ contacts.phone }}</a>
          </div>
          <div class="footer-contact-item">
            <span>Email</span>
            <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
          </div>
          <div class="footer-contact-item">
            <span>Офис</span>
            <span>{{ contacts.address }}</span>
          </div>
          <div class="footer-contact-item">
            <span>Режим работы</span>
            <span>{{ contacts.schedule }}</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">
          © {{ company.foundedYear }}–{{ company.copyrightYear }} {{ company.legalName }}. Все права защищены.
        </div>
        <div class="footer-meta">
          ИНН {{ company.inn }} · ОГРН {{ company.ogrn }}
        </div>
        <div class="footer-legal">
          <a
            v-for="link in footerNav.legal"
            :key="link.label"
            :href="link.to"
            @click="handleFooterLink($event, link.to)"
          >{{ link.label }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
