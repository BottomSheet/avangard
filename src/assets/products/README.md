# Фотографии товаров и услуг

Структура: для каждой карточки (товар, услуга, единица техники) — отдельная папка с её `slug`.

```
products/
  excavator/        ← spec — спецтехника
    1.jpg, 2.jpg, ...
  gravel/           ← материалы
    1.jpg, 2.jpg, ...
  earthworks/       ← услуги
    1.jpg, 2.jpg, ...
```

## Текущее состояние

| Раздел | Slug-и | Что подключено |
|---|---|---|
| **Спецтехника** | `excavator`, `backhoe`, `loader`, `crane` | ✅ Реальные фотографии |
| **Материалы** | `sand-river`, `sand-quarry`, `gravel`, `limestone`, `pgs`, `concrete` | ✅ Реальные фотографии (800×600, 4:3) |
| **Услуги** | `earthworks`, `planning`, `roads`, `overburden`, `drainage`, `demolition`, `utilities`, `landscaping`, `quarry` | ⚠️ Временные SVG-плейсхолдеры |

## Как заменить SVG-плейсхолдер на реальное фото

1. **Найдите фото** на любом из сайтов с лицензией для коммерческого использования:
   - [pexels.com](https://www.pexels.com) — лицензия Pexels (без атрибуции)
   - [unsplash.com](https://unsplash.com) — лицензия Unsplash (без атрибуции)
   - [pixabay.com](https://pixabay.com) — CC0 (без атрибуции)

2. **Положите фото** в папку соответствующего slug, например:
   ```
   products/gravel/1.jpg
   products/gravel/2.jpg
   products/gravel/3.jpg
   ```

3. **Обновите ссылку** в данных. Найдите файл:
   - `src/data/materials.js` — для материалов
   - `src/data/services.js` — для услуг

   И замените расширение `.svg` на `.jpg` у поля `image`:
   ```js
   image: new URL('@/assets/products/gravel/1.svg', import.meta.url).href,
   //                                         ^^^^ заменить на .jpg
   ```

4. **Для галереи на странице товара** (карусель из нескольких фото) добавьте массив `images` в:
   - `src/data/materialProducts.js` — для материалов
   - `src/data/serviceProducts.js` — для услуг

   ```js
   images: [
     { src: new URL('@/assets/products/gravel/1.jpg', import.meta.url).href, alt: 'Щебень гравийный' },
     { src: new URL('@/assets/products/gravel/2.jpg', import.meta.url).href, alt: 'Гравий крупным планом' },
     { src: new URL('@/assets/products/gravel/3.jpg', import.meta.url).href, alt: 'Погрузка щебня' }
   ],
   ```

   Сколько фото в массиве — столько миниатюр и появится.

## Формат фото

- **JPG** или **PNG**, обязательная пропорция **4:3** (например, 800×600, 1200×900 или 1600×1200 px)
- Изображения автоматически обрезаются под 4:3 в карточках (`object-fit: cover`)
- Размер файла: до 300–500 КБ на фото (для скорости загрузки)
- При желании сжать через [tinypng.com](https://tinypng.com) или [squoosh.app](https://squoosh.app)
