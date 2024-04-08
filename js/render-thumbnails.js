import { removeElements, debounce } from './util';

const filtersContainer = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Задержка для debounce
const DEBOUNCE_DELAY = 500;

// Функция, показывающая фильтры
const showFilters = () => filtersContainer.classList.remove('img-filters--inactive');

// Создает элемент миниатюры на основе данных
const createThumbnailElement = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  // Устанавливаем идентификатор миниатюры
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

// Отрисовывает миниатюры в контейнере
const renderThumbnails = (thumbnails) => {
  const thumbnailFragment = document.createDocumentFragment();

  // Перебираем миниатюры и добавляем их в фрагмент
  thumbnails.forEach((thumbnail) => {
    thumbnailFragment.appendChild(createThumbnailElement(thumbnail));
  });

  // Очищаем существующие миниатюры
  removeElements('.picture');
  picturesContainer.appendChild(thumbnailFragment);

  // Показываем фильтры
  showFilters();
};

// Создаем debounced версию функции renderThumbnails
const renderThumbnailsDebounced = debounce(renderThumbnails, DEBOUNCE_DELAY);

export { renderThumbnailsDebounced };
