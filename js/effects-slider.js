const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');

// Применение эффекта "Оригинал"
const renderEffectNone = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }
};

// Применение эффекта "Хром"
const renderEffectChrome = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentCount = sliderElement.noUiSlider.get();
    sliderInput.value = currentCount;
    picturePreview.style.filter = `grayscale(${currentCount})`;
  });
};

// Применение эффекта "Сепия"
const renderEffectSepia = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentCount = sliderElement.noUiSlider.get();
    sliderInput.value = currentCount;
    picturePreview.style.filter = `sepia(${currentCount})`;
  });
};

// Применение эффекта "Марвин"
const renderEffectMarvin = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentCount = sliderElement.noUiSlider.get();
    sliderInput.value = currentCount;
    picturePreview.style.filter = `invert(${currentCount}%)`;
  });
};

// Применение эффекта "Фобос"
const renderEffectPhobos = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentCount = sliderElement.noUiSlider.get();
    sliderInput.value = currentCount;
    picturePreview.style.filter = `blur(${currentCount}px)`;
  });
};

// Применение эффекта "Зной"
const renderEffectHeat = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentCount = sliderElement.noUiSlider.get();
    sliderInput.value = currentCount;
    picturePreview.style.filter = `brightness(${currentCount})`;
  });
};

effectNone.addEventListener('change', renderEffectNone);
effectChrome.addEventListener('change', renderEffectChrome);
effectSepia.addEventListener('change', renderEffectSepia);
effectMarvin.addEventListener('change', renderEffectMarvin);
effectPhobos.addEventListener('change', renderEffectPhobos);
effectHeat.addEventListener('change', renderEffectHeat);
