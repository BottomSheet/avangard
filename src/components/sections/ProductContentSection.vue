<script setup>
defineProps({
  data: { type: Object, required: true },
  // 'material' (с фракциями) | 'equipment' (с тарифной таблицей)
  kind: { type: String, default: 'material' }
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

      <!-- Применения -->
      <div class="content-block">
        <div class="section-label">{{ kind === 'equipment' ? 'Виды работ' : 'Применение' }}</div>
        <h2>{{ kind === 'equipment' ? 'Что умеет машина' : 'Где используется' }}</h2>
        <div class="applications-grid">
          <div v-for="app in data.applications" :key="app.num" class="app-item">
            <div class="app-item-num">— {{ app.num }}</div>
            <h3>{{ app.title }}</h3>
            <p>{{ app.text }}</p>
          </div>
        </div>
      </div>

      <!-- Технические характеристики -->
      <div class="content-block">
        <div class="section-label">Характеристики</div>
        <h2>{{ kind === 'equipment' ? 'Технические параметры' : 'Технические свойства' }}</h2>
        <div class="specs-grid">
          <div v-for="(row, idx) in data.specs" :key="idx" class="specs-row">
            <span class="specs-key">{{ row[0] }}</span>
            <span class="specs-val">{{ row[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Фракции (для материалов) -->
      <div v-if="kind === 'material' && data.fractions" class="content-block">
        <div class="section-label">Фракции и цены</div>
        <h2>Доступные варианты</h2>
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

      <!-- Тарифы (для техники) -->
      <div v-if="kind === 'equipment' && data.pricing" class="content-block">
        <div class="section-label">Тарифы</div>
        <h2>Стоимость аренды</h2>
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

      <!-- Условия поставки / аренды -->
      <div class="content-block">
        <div class="section-label">{{ kind === 'equipment' ? 'Условия' : 'Доставка и оплата' }}</div>
        <h2>{{ kind === 'equipment' ? 'Аренда и доставка' : 'Условия поставки' }}</h2>
        <div class="delivery-mini">
          <div>
            <h3>{{ kind === 'equipment' ? 'Собственный парк техники' : 'Собственный автопарк' }}</h3>
            <p v-if="kind === 'equipment'">
              Регулярное ТО и резервные машины — работаем без срывов сроков.
              Доставляем технику на объект собственным транспортом.
            </p>
            <p v-else>
              Доставляем материал самосвалами от 10 до 30 тонн.
              Подбираем подходящую машину под объём заказа и условия подъезда к объекту.
            </p>
          </div>
          <div class="delivery-mini-list">
            <template v-if="kind === 'equipment'">
              <div><span>Доставка на объект <small>в пределах 150 км от точки базирования</small></span></div>
              <div><span>Минимальный срок аренды <small>смена 8 часов или сутки</small></span></div>
              <div><span>Оператор включён в стоимость <small>опыт работы от 5 лет</small></span></div>
              <div><span>Оплата <small>наличные, карта, банковский перевод, расчётный счёт</small></span></div>
            </template>
            <template v-else>
              <div><span>Доставка день в день <small>при заявке до 12:00</small></span></div>
              <div><span>Радиус доставки 150 км <small>от точки отгрузки</small></span></div>
              <div><span>Документы при отгрузке <small>ТТН, паспорт качества, счёт-фактура</small></span></div>
              <div><span>Оплата <small>наличные, карта, банковский перевод, расчётный счёт</small></span></div>
            </template>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
