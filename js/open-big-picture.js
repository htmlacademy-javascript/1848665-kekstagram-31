import { data } from './data.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const imgPicture = bigPicture.querySelector('.big-picture__img').querySelector('img');
const countLikes = bigPicture.querySelector('.likes-count');
const descriptionPicture = bigPicture.querySelector('.social__caption');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const totalComments = bigPicture.querySelector('.social__comment-total-count');

// Событие отображения модального окна
const openBigPicture = (pictureId) => {
  // Получение обьекта выбранной миниатюры с массива
  const currentThumbnail = data.find((num) => num.id === Number(pictureId));

  // Отчистка комментариев
  clearComments();

  // Добавление комментариев
  renderComments(currentThumbnail.comments);

  // Заполнение данных в модальном окне
  imgPicture.src = currentThumbnail.url;
  countLikes.textContent = currentThumbnail.likes;
  descriptionPicture.textContent = currentThumbnail.description;
  totalComments.textContent = currentThumbnail.comments.length;

  // Отображение модального окна
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обработчик закрытия модального окна по кнопке
  cancelButton.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });

  // Обработчик закрытия модального окна по клавише
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }
  });
};

export { openBigPicture };
