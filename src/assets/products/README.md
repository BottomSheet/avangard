# Фотографии товаров

Структура: для каждого товара отдельная папка по его slug.

```
products/
  granite/        ← slug товара (см. data/materialProducts.js)
    1.jpg
    2.jpg
    3.jpg
  limestone/
    1.jpg
    ...
```

## Формат
- **JPG** или **PNG**, оптимально пропорция **4:3** (например, 1200×900 px)
- Картинки в карточке каталога и галерее товара кадрируются под 4:3 автоматически (`object-fit: cover`),
  но если исходник уже в 4:3 — обрезки не будет
- Размер файла: рекомендуется до 300–500 КБ на фото (для скорости загрузки)

## Как подключить фото

### 1. Главное фото в карточке каталога (на странице раздела)

В файле `src/data/materials.js` (или `equipment.js`, `services.js`) у нужного товара добавить поле `image`:

```js
{
  slug: 'granite',
  image: new URL('@/assets/products/granite/1.jpg', import.meta.url).href,
  imageAlt: 'Щебень гранитный',  // необязательно, для SEO/доступности
  title: 'Щебень гранитный',
  description: '...',
  ...
}
```

### 2. Галерея на странице товара (главное фото + миниатюры)

В файле `src/data/materialProducts.js` (или `equipmentProducts.js`, `serviceProducts.js`) у товара добавить массив `images`:

```js
images: [
  { src: new URL('@/assets/products/granite/1.jpg', import.meta.url).href, alt: 'Описание' },
  { src: new URL('@/assets/products/granite/2.jpg', import.meta.url).href, alt: 'Описание' },
  { src: new URL('@/assets/products/granite/3.jpg', import.meta.url).href, alt: 'Описание' }
]
```

**Сколько фото в массиве — столько миниатюр и появится** (1, 2, 3, 4, 5… любое количество).
Поля `photoLabel` и `thumbsCount` можно удалить — они нужны только для текстового плейсхолдера.
