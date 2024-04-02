const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const uploadedPicture = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level');

const effectOptions = {
  none: {
    name: 'none',
  },
  chrome:{
    name: 'chrome',
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
    style: 'grayscale',
  },
  sepia: {
    name: 'sepia',
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
    style: 'sepia',
  },
  marvin: {
    name: 'marvin',
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
    suffix: '%',
    style: 'invert',
  },
  phobos: {
    name: 'phobos',
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
    suffix: 'px',
    style: 'blur',
  },
  heat: {
    name: 'heat',
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
    style: 'brightness',
  },
};

const renderEffect = (effect) => {
  if (effect.name === 'none') {
    uploadedPicture.style.filter = 'none';
    sliderContainer.classList.add('hidden');

    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
    return;
  }
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  sliderContainer.classList.remove('hidden');
  noUiSlider.create(slider, effect);

  slider.noUiSlider.on('update', () => {
    const currentCount = slider.noUiSlider.get();
    sliderInput.value = currentCount;
    uploadedPicture.style.filter = `${effect.style}(${currentCount}${effect.suffix || ''})`;
  });
};

export { slider, effectOptions, renderEffect };
