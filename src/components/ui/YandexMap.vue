<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  center: { type: Array, default: () => [56.129057, 40.406635] }, // Владимир
  zoom: { type: Number, default: 11 },
  points: { type: Array, default: () => [] }
})

const mapEl = ref(null)
let mapInstance = null

function initMap() {
  if (!window.ymaps || !mapEl.value) return

  mapInstance = new window.ymaps.Map(mapEl.value, {
    center: props.center,
    zoom: props.zoom,
    controls: ['zoomControl']
  }, {
    suppressMapOpenBlock: true
  })

  props.points.forEach((p) => {
    const placemark = new window.ymaps.Placemark(
      p.coords,
      {
        balloonContentHeader: p.title,
        balloonContentBody: p.description || '',
        balloonContentFooter: p.address || '',
        hintContent: p.title
      },
      {
        preset: 'islands#blackDotIcon'
      }
    )
    mapInstance.geoObjects.add(placemark)
  })
}

onMounted(() => {
  if (window.ymaps) {
    window.ymaps.ready(initMap)
  } else {
    // ждём загрузки скрипта, если ещё не успел
    const interval = setInterval(() => {
      if (window.ymaps) {
        clearInterval(interval)
        window.ymaps.ready(initMap)
      }
    }, 100)
  }
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
})
</script>

<template>
  <div ref="mapEl" class="yandex-map"></div>
</template>

<style scoped>
.yandex-map {
  width: 100%;
  height: 460px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}
</style>