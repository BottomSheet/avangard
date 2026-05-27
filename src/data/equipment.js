/**
 * Данные страницы «Спецтехника».
 */

export const pageHero = {
  title: 'Аренда\nспецтехники',
  description: '23+ единиц собственной техники. С оператором, готовы к выезду в течение 24 часов.',
  image: new URL('@/assets/hero/equipment-hero.jpg', import.meta.url).href,
  imageAlt: 'Аренда спецтехники'
}

export const whyUs = {
  label: 'Почему выбирают нас',
  title: 'Надёжная техника\nс опытными операторами',
  items: [
    {
      icon: '◈',
      title: 'Собственный исправный парк',
      description: '23+ единиц техники в постоянной готовности. Регулярное ТО, все машины застрахованы. Никаких субподрядчиков — полная ответственность за результат.'
    },
    {
      icon: '◉',
      title: 'Опытные операторы',
      description: 'Каждая единица техники предоставляется с аттестованным оператором. Стаж — от 5 лет.'
    },
    {
      icon: '◎',
      title: 'Выезд 24/7',
      description: 'Принимаем заявки круглосуточно. Готовы к выезду на объект в течение суток после согласования.'
    },
    {
      icon: '○',
      title: 'Любой способ оплаты',
      description: 'Наличные, банковский перевод, карта, расчётный счёт для юрлиц. Работаем с НДС и без.'
    }
  ]
}

export const catalog = {
  label: 'Каталог техники',
  title: 'Наш парк',
  ctaLabel: 'Арендовать',
  basePath: '/equipment',
  items: [
    {
      slug: 'excavator',
      images: [
        { src: new URL('@/assets/products/excavator/1.jpg', import.meta.url).href, alt: 'Экскаватор гусеничный Komatsu PC220' },
        { src: new URL('@/assets/products/excavator/5.jpg', import.meta.url).href, alt: 'Экскаватор гусеничный — общий вид' },
        { src: new URL('@/assets/products/excavator/4.jpg', import.meta.url).href, alt: 'Экскаватор гусеничный — рабочий процесс' },
        { src: new URL('@/assets/products/excavator/2.jpg', import.meta.url).href, alt: 'Экскаватор гусеничный — вид сбоку' },
        { src: new URL('@/assets/products/excavator/3.jpg', import.meta.url).href, alt: 'Экскаватор гусеничный на объекте' }
      ],
      imageAlt: 'Экскаватор гусеничный Komatsu PC220',
      imgLabel: 'фото / экскаватор гусеничный',
      title: 'Экскаватор гусеничный - Komatsu PC220',
      description: 'Объём ковша 1,1 м³. Глубина копания до 7 м. Для котлованов, траншей, земляных работ.',
      price: 'от 3 500 ₽/час',
      priceNote: 'с оператором'
    },
    {
      slug: 'backhoe',
      images: [
        { src: new URL('@/assets/products/backhoe/1.jpg', import.meta.url).href, alt: 'Экскаватор-погрузчик CASE 695SV' },
        { src: new URL('@/assets/products/backhoe/2.jpg', import.meta.url).href, alt: 'Экскаватор-погрузчик — вид с другой стороны' },
        { src: new URL('@/assets/products/backhoe/3.jpg', import.meta.url).href, alt: 'Экскаватор-погрузчик на объекте' }
      ],
      imageAlt: 'Экскаватор-погрузчик CASE 695SV',
      imgLabel: 'фото / экскаватор-погрузчик',
      title: 'Экскаватор-погрузчик - CASE 695SV',
      description: 'Ковш 0,25 м³ сзади, фронтальный ковш 1 м³. Универсальная машина для малых объёмов работ.',
      price: 'от 3 200 ₽/час',
      priceNote: 'с оператором'
    },
    {
      slug: 'loader',
      images: [
        { src: new URL('@/assets/products/loader/1.jpg', import.meta.url).href, alt: 'Фронтальный погрузчик Lonking LG833N' },
        { src: new URL('@/assets/products/loader/2.jpg', import.meta.url).href, alt: 'Фронтальный погрузчик — вид сбоку' },
        { src: new URL('@/assets/products/loader/3.jpg', import.meta.url).href, alt: 'Фронтальный погрузчик на объекте' },
        { src: new URL('@/assets/products/loader/4.jpg', import.meta.url).href, alt: 'Фронтальный погрузчик — рабочий процесс' }
      ],
      imageAlt: 'Фронтальный погрузчик Lonking LG833N',
      imgLabel: 'фото / фронтальный погрузчик',
      title: 'Фронтальный погрузчик - Lonking LG833N',
      description: 'Грузоподъёмность до 3 т. Ковш 1,8 м³. Погрузка сыпучих материалов, расчистка территорий.',
      price: 'от 3 200 ₽/час',
      priceNote: 'с оператором'
    },
    {
      slug: 'crane',
      images: [
        { src: new URL('@/assets/products/crane/1.jpg', import.meta.url).href, alt: 'Автокран Ивановец KC-45717K-3P Air' },
        { src: new URL('@/assets/products/crane/2.jpg', import.meta.url).href, alt: 'Автокран — общий вид' }
      ],
      imageAlt: 'Автокран Ивановец KC-45717K-3P Air',
      imgLabel: 'фото / автокран',
      title: 'Автокран - Ивановец KC-45717K-3P Air',
      description: 'Грузоподъёмность 25 т, вылет стрелы до 29 м. Монтажные и погрузочно-разгрузочные работы.',
      price: 'от 3 000 ₽/час',
      priceNote: 'с оператором'
    }
  ]
}

export const workTypes = {
  label: 'Виды выполняемых работ',
  title: 'Что мы выполняем',
  items: [
    {
      icon: '◇',
      title: 'Земляные работы',
      description: 'Разработка котлованов и траншей, выемка и вывоз грунта, обратная засыпка и трамбовка, подготовка оснований.'
    },
    {
      icon: '◈',
      title: 'Планировка территорий',
      description: 'Вертикальная планировка, выравнивание рельефа, срезка и подсыпка грунта, формирование уклонов.'
    },
    {
      icon: '⊙',
      title: 'Погрузка и перемещение',
      description: 'Погрузка сыпучих материалов и грузов, расчистка территорий, перемещение материалов по объекту.'
    },
    {
      icon: '△',
      title: 'Монтажные и подъёмные работы',
      description: 'Подача материалов на высоту, монтаж конструкций и перекрытий, установка фундаментных блоков.'
    },
    {
      icon: '◉',
      title: 'Укладка коммуникаций',
      description: 'Разработка траншей под трубопроводы и кабели, засыпка и восстановление покрытия после укладки.'
    },
    {
      icon: '○',
      title: 'Расчистка и демонтаж',
      description: 'Расчистка снега и строительного мусора, снос ветхих сооружений, подготовка площадок под строительство.'
    }
  ]
}

export const process = {
  label: 'Порядок заключения сделки',
  title: 'Просто и прозрачно',
  steps: [
    {
      num: '01',
      title: 'Заявка',
      description: 'Оставьте заявку на сайте или позвоните. Уточним тип техники, объём и сроки работ, адрес объекта.'
    },
    {
      num: '02',
      title: 'Подбор техники и договор',
      description: 'Подбираем технику под задачи объекта, согласуем стоимость машино-часа и график. Заключаем договор для юрлиц в течение дня.'
    },
    {
      num: '03',
      title: 'Оплата',
      description: 'Наличные, банковский перевод, карта. Для юрлиц — счёт с НДС или без. Для постоянных клиентов возможна оплата по факту выполненных смен.'
    },
    {
      num: '04',
      title: 'Выезд техники на объект',
      description: 'Техника с аттестованным оператором прибывает в согласованное время. Готовы к выезду в течение 24 часов после согласования.'
    }
  ]
}

export const contact = {
  label: 'Контакты',
  title: 'Подберём технику и согласуем выезд',
  formId: 'formEq',
  formTitle: 'Арендовать технику',
  formSubtitle: 'Укажите имя и телефон — перезвоним и уточним детали',
  showAddress: false,
  scheduleField: 'equipment'
}
