import { data } from './data.js';
import { renderThumbnailsDebounced } from './render-thumbnails.js';
import { filteredThumbnails } from './filter-thumbnails.js';
import { openBigPicture } from './open-big-picture.js';
// import { closePictureForm, setPictureFormSubmit } from './picture-form.js';

const thumbnailList = document.querySelector('.pictures');

if (data) {
  // Функция отрисовки полученных миниатюр
  renderThumbnailsDebounced(data);

  // Функция отрисовки отфильтрованных миниатюр
  filteredThumbnails(renderThumbnailsDebounced, data);
}

// Обработчик нажатия на миниатюру
thumbnailList.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');
  if (currentThumbnail) {
    openBigPicture(currentThumbnail.dataset.pictureId);
  }
});

// Функция отправки формы
// setPictureFormSubmit(closePictureForm);
