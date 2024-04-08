const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const commentUploadButton = bigPicture.querySelector('.comments-loader');
const countShownComments = bigPicture.querySelector('.social__comment-shown-count');

// Количество комментариев, отображаемых за один раз
const COUNT_STEP = 5;
// Количество показанных комментариев
let shownCommentsCount = 0;
// Массив комментариев
let comments = [];

// Создает новый элемент комментария на основе шаблона
const createCommentElement = ({ avatar, name, message }) => {
  const newComment = templateComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

// Добавляет элементы комментариев в список комментариев
const appendComments = (commentElements) => {
  const socialCommentsFragment = document.createDocumentFragment();
  commentElements.forEach((comment) => socialCommentsFragment.appendChild(comment));
  commentsList.appendChild(socialCommentsFragment);
};

// Отображает следующую порцию комментариев
const renderNextComments = () => {
  // Получаем следующие комментарии для отображения
  const renderedComments = comments.slice(shownCommentsCount, shownCommentsCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + shownCommentsCount;

  // Создаем элементы комментариев и добавляем их в список
  const commentElements = renderedComments.map(createCommentElement);
  appendComments(commentElements);

  // Скрываем кнопку "Загрузить еще", если все комментарии отображены
  if (renderedCommentsLength >= comments.length) {
    commentUploadButton.classList.add('hidden');
  }

  // Обновляем счетчик отображенных комментариев
  shownCommentsCount += COUNT_STEP;
  countShownComments.textContent = renderedCommentsLength;
};

// Отображает комментарии на странице
const renderComments = (currentComments) => {
  // Проверяем, что входные данные являются массивом и не пустые
  if (!Array.isArray(currentComments) || currentComments.length === 0) {
    return;
  }

  comments = currentComments;
  renderNextComments();

  // Добавляем обработчик клика на кнопку "Загрузить еще"
  commentUploadButton.addEventListener('click', renderNextComments);
};

// Очищает список комментариев и сбрасывает счетчик отображенных комментариев
const clearComments = () => {
  shownCommentsCount = 0;
  commentsList.innerHTML = '';
  commentUploadButton.removeEventListener('click', renderNextComments);
  commentUploadButton.classList.remove('hidden');
};

export { clearComments, renderComments };
