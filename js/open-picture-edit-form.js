/*
1. Реализовавать отображение формы редактирования изображения после выбора изображения для загрузки

2. Реализовать закрытие формы редактирования изображения
2.1 Реализовать сброс значения выбранной фотографии
2.2 Реализовать сброс остальных полей формы

3. Реализовать валидацию формы:
3.1 Реализовать валидацию поля Хэштеги
3.2 Реализовать валидацию поля Комментарий
*/

const formNode = document.querySelector('.img-upload__form');
const pictureUploadForm = formNode.querySelector('.img-upload__overlay');
const pictureUploadInput = formNode.querySelector('.img-upload__input');
const cancelButton = formNode.querySelector('.img-upload__cancel');
const hashtagInput = formNode.querySelector('.text__hashtags');
const descriptionInput = formNode.querySelector('.text__description');

// Проверка фокуса на полях формы
const isFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

const openPictureEditForm = () => {
  // Отображение формы
  pictureUploadForm.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  // Обработчик закрытия формы по кнопке
  cancelButton.addEventListener('click', () => {
    pictureUploadForm.classList.add('hidden');
    formNode.reset();
  });

  // Обработчик закрытия формы по клавише
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !isFieldFocused()) {
      evt.preventDefault();
      pictureUploadForm.classList.add('hidden');
      formNode.reset();
    }
  });
};

// Валидация формы редактирования фотографии
const pristine = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидация поля hashtags
const isValidHashtags = (hashtags) => {
  /* Регулярное выражение проверяет, что строка содержит от 1 до 5 уникальных хэштегов, где каждый хэштег состоит из символа решетки #,
  за которым следует от 1 до 19 латинских или русских букв или цифр, а также может быть необязательный пробельный символ между хэштегами */
  const hashtagRegex = /^(?:(?!.*?(\b\w+\b)(?=.*?\1))(#[a-zа-яё0-9]{1,19}\s?)){1,5}$/i;
  return hashtagRegex.test(hashtags);
};

pristine.addValidator(
  hashtagInput,
  isValidHashtags,
  'Введен некорректный хэштег'
);

// Валидация поля description
const isValidDescription = (description) => {
  // Регулярное выражение проверяет, что строка содержит от 0 до 140 символов
  const descriptionRegex = /.{0,140}/;
  return descriptionRegex.test(description);
};

pristine.addValidator(
  descriptionInput,
  isValidDescription,
  'Максимальная длина комментария 140 символов'
);

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { pictureUploadInput, openPictureEditForm };
