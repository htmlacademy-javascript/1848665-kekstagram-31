import { data } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showFilters, filteredThumbnails } from './filter-thumbnails.js';
import { openBigPicture } from './open-big-picture.js';
import { pictureUploadInput, openPictureForm, closePictureForm, setPictureFormSubmit } from './picture-form.js';

const thumbnailList = document.querySelector('.pictures');

// Функция отрисовки полученных миниатюр
renderThumbnails(data);

// Обработчик нажатия на миниатюру
thumbnailList.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');
  if (currentThumbnail) {
    openBigPicture(currentThumbnail.dataset.pictureId);
  }
});

// Обработчик открытия формы
pictureUploadInput.addEventListener('change', (evt) => {
  const selectedPicture = evt.target.files[0];
  if (selectedPicture) {
    openPictureForm(selectedPicture);
  }
});

// Функция отправки формы
setPictureFormSubmit(closePictureForm);

// Функция отображения фильтров
showFilters();

// Функция отрисовки отфильтрованных миниатюр
filteredThumbnails(renderThumbnails, data);
