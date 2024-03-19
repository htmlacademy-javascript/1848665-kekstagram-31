const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

// Функция-обработчик события click
const handleClick = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    // Отображение окна полноразмерного просмотра фотографии
    bigPicture.classList.remove('hidden');
    // Блокировка скролла контейнера с фотографией
    document.body.classList.add('.modal-open');
    // Скрытие счетчика и кнопки загрузки новых комментариев
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    // Поиск фотографий по которой произошел click
    bigPicture.querySelector('img').src = evt.target.src;
    const picture = evt.target.parentElement;
    // Добавление данных о конкретной фотографии
    bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;
    bigPicture.querySelector('.social__comment-shown-count').textContent = picture.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__comment-total-count').textContent = picture.querySelector('.picture__comments').textContent;
  }
};

// Добавляем обработчик события click на весь документ
document.addEventListener('click', handleClick);

cancelButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});
