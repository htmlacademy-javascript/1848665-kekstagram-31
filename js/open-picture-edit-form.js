import { slider, effectOptions, renderEffect } from './effects-slider.js';
import { sendData } from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const COUNT_STEP = 25;

const formNode = document.querySelector('.img-upload__form');
const pictureUploadForm = formNode.querySelector('.img-upload__overlay');
const pictureUploadInput = formNode.querySelector('.img-upload__input');
const cancelButton = formNode.querySelector('.img-upload__cancel');
const hashtagInput = formNode.querySelector('.text__hashtags');
const descriptionInput = formNode.querySelector('.text__description');
const scaleDownButton = formNode.querySelector('.scale__control--smaller');
const scaleUpButton = formNode.querySelector('.scale__control--bigger');
const scaleControl = formNode.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.effect-level');
const effectContainer = document.querySelector('.effects');
const uploadedPicture = document.querySelector('.img-upload__preview img');

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
const isFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

// Функция отображения формы
const openPictureEditForm = () => {
  pictureUploadForm.classList.remove('hidden');
  sliderContainer.classList.add('hidden');
  document.body.classList.add('.modal-open');

  effectContainer.addEventListener('change', (evt) => {
    const currentEffect = evt.target.value;
    renderEffect(effectOptions[currentEffect]);
  });
};

// Обработчики закрытия формы
cancelButton.addEventListener('click', () => {
  pictureUploadForm.classList.add('hidden');
  formNode.reset();

  uploadedPicture.style.filter = 'none';
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !isFieldFocused()) {
    evt.preventDefault();
    pictureUploadForm.classList.add('hidden');
    formNode.reset();

    uploadedPicture.style.filter = 'none';
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
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

// Обработчик отправки формы
formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => formNode.reset())
      .catch(() => {
        console.log('Error');
      });
  }
});

export { pictureUploadInput, openPictureEditForm };
