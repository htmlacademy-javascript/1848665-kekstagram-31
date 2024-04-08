import { debounce } from './util';
import { showFilters } from './filter-thumbnails.js';

const thumbnailList = document.querySelector('.pictures');
const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const TIMEOUT_DELAY_DEBOUNCE = 500;

const renderThumbnails = (thumbnails) => {
  const thumbnailCardListFragment = document.createDocumentFragment();

  thumbnails.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = templateThumbnail.cloneNode(true);
    thumbnail.dataset.pictureId = id;
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailCardListFragment.appendChild(thumbnail);
  });

  // Добавление фрамента с миниатюрами в список
  thumbnailList.appendChild(thumbnailCardListFragment);

  showFilters();
};

const renderThumbnailsDebounced = debounce((data) => renderThumbnails(data), TIMEOUT_DELAY_DEBOUNCE);

export { renderThumbnailsDebounced };
