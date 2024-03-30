import './effects-slider.js';

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
const picturePreview = formNode.querySelector('.img-upload__preview img');

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
const isFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

// Отображение формы
const openPictureEditForm = () => {
  pictureUploadForm.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  // Обработчики закрытия формы
  cancelButton.addEventListener('click', () => {
    pictureUploadForm.classList.add('hidden');
    formNode.reset();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !isFieldFocused()) {
      evt.preventDefault();
      pictureUploadForm.classList.add('hidden');
      formNode.reset();
    }
  });
};

// Валидация формы
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

pristine.addValidator(
  hashtagInput,
  isValidHashtag,
  'Введён невалидный хэштег'
);

pristine.addValidator(
  hashtagInput,
  isValidQuantityHashtags,
  'Превышено количество введенных хэштегов'
);

pristine.addValidator(
  hashtagInput,
  areValidUniqueHashtags,
  'Введенные хэштеги повторяются'
);

pristine.addValidator(
  descriptionInput,
  isValidDescription,
  'Максимальная длина введенного комментария 140 символов'
);

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Изменение масштаба изображения
scaleDownButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleControl.value);
  if (currentScale !== MIN_SCALE) {
    currentScale -= COUNT_STEP;
  }
  scaleControl.value = `${currentScale}%`;
  scaleControl.setAttribute('value', `${currentScale}%`);
  picturePreview.style.transform = `scale(${currentScale / 100})`;
});

scaleUpButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleControl.value);
  if (currentScale !== MAX_SCALE) {
    currentScale += COUNT_STEP;
  }
  scaleControl.value = `${currentScale}%`;
  scaleControl.setAttribute('value', `${currentScale}%`);
  picturePreview.style.transform = `scale(${currentScale / 100})`;
});

export { pictureUploadInput, openPictureEditForm };
