<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, required: true },
  // 'material' (с фракциями) | 'equipment' (с тарифной таблицей) | 'service' (с этапами/вариантами)
  kind: { type: String, default: 'material' }
})

// Подписи секций в зависимости от типа карточки
const labels = computed(() => {
  if (props.kind === 'equipment') {
    return {
      applicationsLabel: 'Виды работ',
      applicationsTitle: 'Что умеет техника',
      specsTitle: 'Технические параметры',
      variantsLabel: 'Тарифы',
      variantsTitle: 'Стоимость аренды',
      conditionsLabel: 'Условия',
      conditionsTitle: 'Аренда и доставка',
      conditionsHeading: 'Собственный парк техники',
      conditionsText: 'Регулярное ТО и резервные машины — работаем без срывов сроков. Доставляем технику на объект собственным транспортом.'
    }
  }
  if (props.kind === 'service') {
    return {
      applicationsLabel: 'Виды работ',
      applicationsTitle: 'Что выполняем',
      specsTitle: 'Параметры услуги',
      variantsLabel: 'Варианты исполнения',
      variantsTitle: 'Уровни выполнения работ',
      conditionsLabel: 'Условия выполнения',
      conditionsTitle: 'Как мы работаем',
      conditionsHeading: 'Полный цикл под ключ',
      conditionsText: 'Берём на себя все этапы — от выезда инженера и проектирования до сдачи объекта с исполнительной документацией. Гарантия по договору.'
    }
  }
  // material — по умолчанию
  return {
    applicationsLabel: 'Применение',
    applicationsTitle: 'Где используется',
    specsTitle: 'Технические свойства',
    variantsLabel: 'Фракции и цены',
    variantsTitle: 'Доступные варианты',
    conditionsLabel: 'Доставка и оплата',
    conditionsTitle: 'Условия поставки',
    conditionsHeading: 'Собственный автопарк',
    conditionsText: 'Доставляем материал самосвалами от 20 тонн. Подбираем подходящую машину под объём заказа и условия подъезда к объекту.'
  }
})

// Список условий справа (правая колонка delivery-mini)
const conditionsList = computed(() => {
  if (props.kind === 'equipment') {
    return [
      { main: 'Доставка на объект', sub: 'доставим в любую точку' },
      { main: 'Минимальный срок аренды', sub: 'смена от 4 часов' },
      { main: 'Оператор включён в стоимость', sub: 'опыт работы от 5 лет' },
      { main: 'Оплата', sub: 'наличные, карта, банковский перевод, расчётный счёт' }
    ]
  }
  if (props.kind === 'service') {
    return [
      { main: 'Выезд инженера', sub: 'бесплатно в любую точку' },
      { main: 'Договор и смета', sub: 'гибкие условия' },
      { main: 'Документы по объекту', sub: 'ППР, акты, исполнительная съёмка, гарантия' },
      { main: 'Оплата', sub: 'наличные, карта, банковский перевод, расчётный счёт' }
    ]
  }
  return [
    { main: 'Доставка на следующий день', sub: 'При наличии материалов' },
    { main: 'Радиус доставки 70 км', sub: 'от точки отгрузки' },
    { main: 'Документы при отгрузке', sub: 'ТТН, паспорт качества, счёт-фактура' },
    { main: 'Оплата', sub: 'наличные, карта, банковский перевод, расчётный счёт' }
  ]
})

// Показываем ли блок «вариантов» (фракции/тарифы/уровни)
const showVariants = computed(() => {
  if (props.kind === 'equipment') return !!props.data.pricing
  // material и service используют data.fractions
  return !!props.data.fractions
})
</script>

<template>
  <section class="product-content">
    <div class="wrap">

      <!-- Описание -->
      <div class="content-block">
        <div class="section-label">Описание</div>
        <h2>{{ data.description.title }}</h2>
        <p class="lead">{{ data.description.lead }}</p>
        <p>{{ data.description.body }}</p>
      </div>

      <!-- Применения / Виды работ -->
      <div class="content-block">
        <div class="section-label">{{ labels.applicationsLabel }}</div>
        <h2>{{ labels.applicationsTitle }}</h2>
        <div class="applications-grid">
          <div v-for="app in data.applications" :key="app.num" class="app-item">
            <div class="app-item-num">— {{ app.num }}</div>
            <h3>{{ app.title }}</h3>
            <p>{{ app.text }}</p>
          </div>
        </div>
      </div>

      <!-- Характеристики -->
      <div class="content-block">
        <div class="section-label">Характеристики</div>
        <h2>{{ labels.specsTitle }}</h2>
        <div class="specs-grid">
          <div v-for="(row, idx) in data.specs" :key="idx" class="specs-row">
            <span class="specs-key">{{ row[0] }}</span>
            <span class="specs-val">{{ row[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Фракции (material/service) -->
      <div v-if="showVariants && kind !== 'equipment'" class="content-block">
        <div class="section-label">{{ labels.variantsLabel }}</div>
        <h2>{{ labels.variantsTitle }}</h2>
        <div class="fractions-grid">
          <div v-for="f in data.fractions" :key="f.num" class="fraction-card">
            <div class="fraction-num">{{ f.num }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.description }}</p>
            <div class="fraction-price">
              {{ f.price }} <small>{{ f.priceNote }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Тарифы (equipment) -->
      <div v-if="kind === 'equipment' && data.pricing" class="content-block">
        <div class="section-label">{{ labels.variantsLabel }}</div>
        <h2>{{ labels.variantsTitle }}</h2>
        <div class="pricing-table">
          <div class="pricing-row head">
            <div class="pkey">Услуга</div>
            <div class="pval">Стоимость</div>
            <div class="pval">Условие</div>
          </div>
          <div v-for="(row, idx) in data.pricing" :key="idx" class="pricing-row">
            <div class="pkey">{{ row.key }}</div>
            <div class="pval">{{ row.val }}</div>
            <div class="pval">{{ row.note }}</div>
          </div>
        </div>
        <p style="margin-top: 20px; font-size: 13px;">
          Стоимость указана с учётом услуг оператора, ГСМ и доставки в пределах города.
          Точная цена зависит от объёма работ, удалённости объекта и срока аренды.
        </p>
      </div>

      <!-- Условия / поставка / выполнение -->
      <div class="content-block">
        <div class="section-label">{{ labels.conditionsLabel }}</div>
        <h2>{{ labels.conditionsTitle }}</h2>
        <div class="delivery-mini">
          <div>
            <h3>{{ labels.conditionsHeading }}</h3>
            <p>{{ labels.conditionsText }}</p>
          </div>
          <div class="delivery-mini-list">
            <div v-for="(c, idx) in conditionsList" :key="idx">
              <span>{{ c.main }} <small>{{ c.sub }}</small></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
