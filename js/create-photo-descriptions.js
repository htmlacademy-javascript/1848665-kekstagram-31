import { createArrayPhotoDescriptions } from './create-array-photo-descriptions.js';

// Получение шаблона фотографии
const photoCardList = document.querySelector('.pictures');
const templatePhotoCard = document.querySelector('#picture').content.querySelector('.picture');

// Создание карточки фотографии и добавление ее в фрагмент

const arrayPhotoDescriptions = createArrayPhotoDescriptions(25);

const photoCardListFragment = document.createDocumentFragment();

arrayPhotoDescriptions.forEach(({url, description, likes, comments}) => {
  const photoCard = templatePhotoCard.cloneNode(true);
  photoCard.querySelector('.picture__img').src = url;
  photoCard.querySelector('.picture__img').alt = description;
  photoCard.querySelector('.picture__likes').textContent = likes;
  photoCard.querySelector('.picture__comments').textContent = comments.length;
  photoCardListFragment.appendChild(photoCard);
});

// Добавление фрамента с карточками фотографий в список карточек фотографий

photoCardList.appendChild(photoCardListFragment);
