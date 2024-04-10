const effectSlider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const uploadedPicture = document.querySelector('.img-upload__preview img');
const effectSliderContainer = document.querySelector('.effect-level');

const effectOptions = {
  none: {},
  chrome:{
    style: 'grayscale',
  },
  sepia: {
    style: 'sepia',
  },
  marvin: {
    range: { min: 0, max: 100, },
    start: 100,
    step: 1,
    suffix: '%',
    style: 'invert',
  },
  phobos: {
    range: { min: 0, max: 3, },
    start: 3,
    suffix: 'px',
    style: 'blur',
  },
  heat: {
    range: { min: 1, max: 3, },
    start: 3,
    style: 'brightness',
  },
};

const createEffectOptionsObj = (effectName, options) => {
  const { range = { min: 0, max: 1 }, start = 1, step = 0.1, suffix, style } = options;
  return {
    name: effectName,
    range: range,
    start: start,
    step: step,
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
    suffix,
    style
  };
};

const createEffect = (name, options) => {
  const originalOptionsEffect = createEffectOptionsObj(name, options);
  if (name === 'none') {
    uploadedPicture.style.filter = 'none';
    effectSliderContainer.classList.add('hidden');
    if (effectSlider.noUiSlider) {
      effectSlider.noUiSlider.destroy();
    }
    return;
  }

  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  effectSliderContainer.classList.remove('hidden');
  noUiSlider.create(effectSlider, originalOptionsEffect);

  effectSlider.noUiSlider.on('update', () => {
    const currentCount = effectSlider.noUiSlider.get();
    effectValueInput.value = currentCount;
    uploadedPicture.style.filter = `${originalOptionsEffect.style}(${currentCount}${originalOptionsEffect.suffix || ''})`;
  });
};

const renderEffect = (effectName) => {
  createEffect(effectName, effectOptions[effectName]);
};

export { effectSlider, renderEffect };
