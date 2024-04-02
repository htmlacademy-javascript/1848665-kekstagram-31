import { data } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { openBigPicture } from './open-big-picture.js';
import { pictureUploadInput, openPictureEditForm } from './open-picture-edit-form.js';

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

// Обработчик загрузки изображения
pictureUploadInput.addEventListener('change', (evt) => {
  const selectedPicture = evt.target.files[0];
  if (selectedPicture) {
    openPictureEditForm(selectedPicture);
  }
});

/*
1. Получение данных
1.1 На 5 секунд добавлять всплывающее сообщение об ошибке

2. Отправка данных
2.1 Сделать отправку формы на сервер
2.2 Сделать возвращение формы в исходное состояние
2.3 Сделать показ сообщения о успешной отправке формы
2.4 Сделать показ сообщения при ошибки отправки данных на сервер
2.5 Сделать обработчик сброса и закрытия формы
2.6 Сделать обработчик на кнопку сброса
*/
