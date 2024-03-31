import { generateThumbnailArray } from './thumbnail-array-generator.js';

const OBJECT_COUNT = 25;

const thumbnailList = document.querySelector('.pictures');
const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');

// Заполнение миниатюры данными и добавление ее в фрагмент
const thumbnailArray = generateThumbnailArray(OBJECT_COUNT);

const thumbnailCardListFragment = document.createDocumentFragment();

thumbnailArray.forEach(({id, url, description, likes, comments}) => {
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

export { thumbnailArray, thumbnailList };
