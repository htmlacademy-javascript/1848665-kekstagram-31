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
    if (evt.key === 'Escape') {
      evt.preventDefault();
      pictureUploadForm.classList.add('hidden');
      formNode.reset();
    }
  });
};

// Валидация формы
const pristine = new Pristine(formNode);

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export { pictureUploadInput, openPictureEditForm };
