<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  center: { type: Array, default: () => [56.129057, 40.406635] },
  zoom: { type: Number, default: 10 },
  points: { type: Array, default: () => [] }
})

const mapEl = ref(null)
let mapInstance = null

/**
 * Определяет, открыта ли страница на мобильном устройстве.
 */
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)
}

/**
 * Открывает маршрут в приложении Яндекс.Навигатор / Яндекс.Карты.
 * На мобильных пытается открыть нативное приложение через схему yandexnavi://,
 * с fallback на yandexmaps://, и в итоге — на web-версию Яндекс.Карт.
 * На десктопе сразу открывает web-версию.
 */
function openRoute(point) {
  const [lat, lon] = point.coords
  // Web-ссылка на построение маршрута в Яндекс.Картах.
  // rtext=~lat,lon — ставим только конечную точку, начало возьмётся автоматически.
  const webUrl = `https://yandex.ru/maps/?rtext=~${lat}%2C${lon}&rtt=auto`

  if (!isMobile()) {
    window.open(webUrl, '_blank', 'noopener')
    return
  }

  // Мобильное устройство: пробуем открыть Яндекс.Навигатор.
  const naviUrl = `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${lon}`
  // Резервная схема — Яндекс.Карты.
  const mapsUrl = `yandexmaps://maps.yandex.ru/?rtext=~${lat},${lon}&rtt=auto`

  // Если приложение установлено — страница уйдёт в фон и таймеры будут отменены.
  const start = Date.now()
  const fallbackTimer = setTimeout(() => {
    if (Date.now() - start < 2000 && document.visibilityState === 'visible') {
      const second = Date.now()
      window.location.href = mapsUrl
      setTimeout(() => {
        if (Date.now() - second < 2000 && document.visibilityState === 'visible') {
          window.location.href = webUrl
        }
      }, 1200)
    }
  }, 1200)

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      clearTimeout(fallbackTimer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  window.location.href = naviUrl
}

function initMap() {
  if (!window.ymaps || !mapEl.value) return

  mapInstance = new window.ymaps.Map(mapEl.value, {
    center: props.center,
    zoom: props.zoom,
    controls: ['zoomControl', 'fullscreenControl']
  }, {
    suppressMapOpenBlock: true
  })

  props.points.forEach((point, index) => {
    const placemark = new window.ymaps.Placemark(
      point.coords,
      {
        balloonContentHeader: `<strong>${point.title}</strong>`,
        balloonContentBody: `
          ${point.description ? `<p>${point.description}</p>` : ''}
          ${point.address ? `<p><strong>Адрес:</strong> ${point.address}</p>` : ''}
          <button data-index="${index}" class="build-route-btn">Построить маршрут</button>
        `,
        hintContent: point.title
      },
      {
        preset: 'islands#redDotIcon',
        iconColor: '#e63946'
      }
    )

    placemark.events.add('balloonopen', () => {
      setTimeout(() => {
        const btn = document.querySelector(`.build-route-btn[data-index="${index}"]`)
        if (btn && !btn.dataset.bound) {
          btn.dataset.bound = '1'
          btn.addEventListener('click', (e) => {
            e.preventDefault()
            openRoute(point)
          })
        }
      }, 50)
    })

    mapInstance.geoObjects.add(placemark)
  })

  if (props.points.length > 1) {
    mapInstance.setBounds(mapInstance.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 50
    })
  }
}

onMounted(() => {
  if (window.ymaps) {
    window.ymaps.ready(initMap)
  } else {
    const interval = setInterval(() => {
      if (window.ymaps) {
        clearInterval(interval)
        window.ymaps.ready(initMap)
      }
    }, 200)
  }
})

onBeforeUnmount(() => {
  if (mapInstance) mapInstance.destroy()
})
</script>

<template>
  <div ref="mapEl" class="yandex-map"></div>
</template>

<style scoped>
.yandex-map {
  width: 100%;
  height: 560px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}
</style>

<style>
/* Стили без scoped — баллун рендерится Яндекс.Картами вне Vue-компонента */
.build-route-btn {
  background: #e63946;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  font-size: 13px;
}
.build-route-btn:hover { background: #d62839; }
</style>
