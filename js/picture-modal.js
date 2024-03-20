import { thumbnailArray } from './render-thumbnails.js';

const bigPicture = document.querySelector('.big-picture');
const imgPicture = bigPicture.querySelector('.big-picture__img').querySelector('img');
const countLikes = bigPicture.querySelector('.likes-count');
const descriptionPicture = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const countComments = bigPicture.querySelector('.social__comment-count');
const countShownComments = bigPicture.querySelector('.social__comment-shown-count');
const totalComments = bigPicture.querySelector('.social__comment-total-count');
const commentUploadButton = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

// Событие отображения модального окна
const openBigPicture = (pictureId) => {
  // Получение обьекта выбранной миниатюры с массива
  const currentThumbnail = thumbnailArray.find((num) => num.id === Number(pictureId));

  // Заполнение данных в модальном окне
  imgPicture.src = currentThumbnail.url;
  countLikes.textContent = currentThumbnail.likes;
  descriptionPicture.textContent = currentThumbnail.description;
  commentsList.innerHTML = '';
  // Добавление комментариев
  const socialCommentsFragment = document.createDocumentFragment();

  currentThumbnail.comments.forEach((comment) => {
    const newComment = templateComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(newComment);
  });

  commentsList.appendChild(socialCommentsFragment);

  // Отображение модального окна
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  // Обработчик закрытия модального окна по кнопке
  cancelButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });

  // Обработчик закрытия модального окна по клавише
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });

  // Скрытие блока с количеством комментариев
  countComments.classList.add('hidden');
  countShownComments.classList.add('hidden');
  totalComments.classList.add('hidden');
  commentUploadButton.classList.add('hidden');
};

export { openBigPicture };
