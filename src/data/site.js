/**
 * Общие данные сайта.
 * Поменяй здесь — поменяется на всех страницах.
 */

export const company = {
  name: 'АВАНГАРД',
  legalName: 'ООО «Авангард»',
  foundedYear: 2015,
  copyrightYear: 2026,
  tagline: 'Строительная компания полного цикла. Добыча и продажа сыпучих материалов, аренда спецтехники, подрядные работы — с 2015 года.',
  inn: '0000000000',
  ogrn: '0000000000000'
}

export const contacts = {
  phone: '+7 (000) 000-00-00',
  phoneLink: '+70000000000',
  email: 'info@avangard.ru',
  address: 'г. Владимир, ул. , 12',
  schedule: 'Пн–Вс, 08:00–20:00',
  scheduleEquipment: 'Круглосуточно'
}

export const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/materials', label: 'Материалы' },
  { to: '/equipment', label: 'Спецтехника' },
  { to: '/services', label: 'Услуги' }
]

/* ─── Блок «Наши клиенты» на главной ────────────── */
/*
 * КАК ДОБАВИТЬ ЛОГОТИП КЛИЕНТА:
 * 1. Положить файл картинки в папку src/assets/clients/
 *    (рекомендуется PNG с прозрачным фоном или SVG, размер ~300x200px)
 * 2. В записи клиента ниже указать путь:
 *    logo: new URL('@/assets/clients/имя-файла.png', import.meta.url).href
 * 3. Если картинки ещё нет — оставь logoText, секция не сломается.
 */
export const clientsSection = {
  label: 'Наши клиенты',
  title: 'Нам доверяют\nкрупные компании',
  items: [
    {
       logo: new URL('@/assets/clients/wb.png', import.meta.url).href,
      // logoAlt: 'WB Дорожное строительство',
      logoText: 'WB',
      title: 'Крупнейший маркетплейс в России',
      description: 'Активно развивают сеть логистических центров для оптимизации доставки товаров покупателям.'
    },
    {
      logo: new URL('@/assets/clients/y.png', import.meta.url).href,
      // logoAlt: 'Яндекс Сельхозкомплекс',
      logoText: 'ЯНДЕКС',
      logoSub: 'СЕЛЬХОЗКОМПЛЕКС',
      title: 'Ведущая IT-компания',
      description: 'Строят и развивают центры обработки данных для обеспечения стабильной работы своих сервисов и хранения данных пользователей.'
    },
    {
      logo: new URL('@/assets/clients/vd.png', import.meta.url).href,
      // logoAlt: 'ВЛАДСК',
      logoText: 'ВЛАДСК',
      logoSub: '',
      title: 'Крупный дорожный застройщик',
      description: 'Занимаются строительством и ремонтом дорожных объектов.'
    },
    {
      logo: new URL('@/assets/clients/vlads.png', import.meta.url).href,
      // logoAlt: 'ИНВЕСТ КАПИТАЛ',
      logoText: 'Владстандарт',
      title: 'Один из крупнейших произоводителей колбасных изделий',
      description: 'Предприятие производит продукцию из охлажденного мяса, реализуемую через крупные федеральные сети.'
    },
    {
      // logo: new URL('@/assets/clients/logisttra.png', import.meta.url).href,
      // logoAlt: 'ЛОГИСТТРА Logistics',
      logoText: 'ЛОГИСТТРА',
      logoSub: 'LOGISTICS',
      title: 'Логистический оператор',
      description: 'Планировка территорий и устройство контейнерных площадок на терминалах.'
    }
  ]
}

/* ─── Данные для расширенного футера ───────────── */
export const footerNav = {
  directions: {
    title: 'Направления',
    links: [
      { to: '/materials', label: 'Сыпучие материалы' },
      { to: '/equipment', label: 'Аренда спецтехники' },
      { to: '/services', label: 'Подрядные работы' },
      { to: '/#about', label: 'О компании' },
      { to: '/#clients', label: 'Наши клиенты' }
    ]
  },
  info: {
    title: 'Информация',
    links: [
      { to: '#', label: 'Сертификаты' },
      { to: '#', label: 'Реквизиты' },
      { to: '#', label: 'Договор-оферта' },
      { to: '#', label: 'Политика конфиденциальности' }
    ]
  },
  legal: [
    { to: '#', label: 'Политика конфиденциальности' },
    { to: '#', label: 'Согласие на обработку данных' }
  ]
}
