import { isEscapeKey, sendAlert, sendErrorAlert } from './util.js';
import { slider, effectOptions, renderEffect } from './effects-slider.js';
import { sendData } from './api.js';

const formNode = document.querySelector('.img-upload__form');
const pictureUploadForm = formNode.querySelector('.img-upload__overlay');
const pictureUploadInput = formNode.querySelector('.img-upload__input');
const pictureFormCancelButton = formNode.querySelector('.img-upload__cancel');
const hashtagInput = formNode.querySelector('.text__hashtags');
const descriptionInput = formNode.querySelector('.text__description');
const scaleDownButton = formNode.querySelector('.scale__control--smaller');
const scaleUpButton = formNode.querySelector('.scale__control--bigger');
const scaleControl = formNode.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.effect-level');
const effectContainer = document.querySelector('.effects');
const uploadedPicture = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');
const newPicture = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];


// Дополнительное состояние кнопки
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Максимальное количество хештегов
const MAX_HASHTAGS_COUNT = 5;

// Настройки изменения масштаба изображения
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const COUNT_STEP = 25;

// Регулярное выражение для валидации одного хештега
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

// Функция для проверки фокуса на полях формы
const isFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

// Функция проверки нажатия клавиши "Escape"
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closePictureForm();
  }
};

// Обработчик загрузки выбранного изображения

pictureUploadInput.addEventListener('change', () => {
  const file = pictureUploadInput.files[0];
  const currentPicture = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => currentPicture.endsWith(it));

  if (matches) {
    newPicture.src = URL.createObjectURL(file);
  }
});

// Функция открытия формы
const openPictureForm = () => {
  pictureUploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  sliderContainer.classList.add('hidden');
  document.body.classList.add('.modal-open');

  effectContainer.addEventListener('change', (evt) => {
    const currentEffect = evt.target.value;
    renderEffect(effectOptions[currentEffect]);
  });
};

// Функция закрытия формы
const closePictureForm = () => {
  pictureUploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

  formNode.reset();
  uploadedPicture.style.filter = 'none';
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

// Обработчик события нажатия кнопки закрытия формы
pictureFormCancelButton.addEventListener('click', () => {
  closePictureForm();
});

// Обработчик события нажатия клавиши "Escape"
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !isFieldFocused()) {
    closePictureForm();
  }
});

// Изменение масштаба изображения
scaleDownButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleControl.value);
  if (currentScale !== MIN_SCALE) {
    currentScale -= COUNT_STEP;
  }
  scaleControl.value = `${currentScale}%`;
  scaleControl.setAttribute('value', `${currentScale}%`);
  uploadedPicture.style.transform = `scale(${currentScale / 100})`;
});

scaleUpButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleControl.value);
  if (currentScale !== MAX_SCALE) {
    currentScale += COUNT_STEP;
  }
  scaleControl.value = `${currentScale}%`;
  scaleControl.setAttribute('value', `${currentScale}%`);
  uploadedPicture.style.transform = `scale(${currentScale / 100})`;
});

// Валидация формы редактирования изображения
const pristine = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isValidHashtag = (hashtags) => {
  const arrayHashtags = hashtags.split(' ').filter(Boolean);
  return arrayHashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

const isValidQuantityHashtags = (hashtags) => {
  const arrayHashtags = hashtags.split(' ').filter(Boolean);
  return arrayHashtags.length <= MAX_HASHTAGS_COUNT;
};

const areValidUniqueHashtags = (hashtags) => {
  const arrayHashtags = hashtags.split(' ').filter(Boolean);
  const arrayUniqueHashtags = new Set(arrayHashtags);
  return arrayHashtags.length === arrayUniqueHashtags.size;
};

const isValidDescription = (description) => {
  const descriptionRegex = /.{0,140}/;
  return descriptionRegex.test(description);
};

pristine.addValidator(hashtagInput, isValidHashtag, 'Введён невалидный хэштег');
pristine.addValidator(hashtagInput, isValidQuantityHashtags, 'Превышено количество введенных хэштегов');
pristine.addValidator(hashtagInput, areValidUniqueHashtags, 'Введенные хэштеги повторяются');
pristine.addValidator(descriptionInput, isValidDescription, 'Максимальная длина введенного комментария 140 символов');

// Функции блокировки кнопок после отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Функция отправки формы
const setPictureFormSubmit = (onSuccess) => {
  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(sendErrorAlert)
        .finally(() => {
          sendAlert();
          unblockSubmitButton();
        });
    }
  });
};

export { pictureUploadInput, openPictureForm, closePictureForm, setPictureFormSubmit };
