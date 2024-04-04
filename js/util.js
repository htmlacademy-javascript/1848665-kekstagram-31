const ALERT_SHOW_TIME = 5000;

// Получение рандомного числа из диапазона
const generateRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного элемента массива
const generateRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];

// Счетчик на замыкании
const generateRandomId = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Функция проверки нажатия клавиши "Escape"
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция показа сообщения об ошибки загрузки данных
const getErrorAlert = () => {
  const templateGetAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const newAlert = templateGetAlert.cloneNode(true);
  document.body.appendChild(newAlert);

  setTimeout(() => {
    newAlert.remove();
  }, ALERT_SHOW_TIME);
};

// Функция показа сообщения об ошибки отправки формы
const sendErrorAlert = () => {
  const templateSendErrorAlert = document.querySelector('#error').content.querySelector('.error');
  const newAlert = templateSendErrorAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.error__button');
  const containerAlert = document.body.querySelector('.error__inner');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && (evt.target !== newAlert)) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== containerAlert) {
      newAlert.remove();
    }
  });
};

// Функция показа сообщения о успешной отправке формы
const sendAlert = () => {
  const templateSendAlert = document.querySelector('#success').content.querySelector('.success');
  const newAlert = templateSendAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.success__button');
  const containerAlert = document.body.querySelector('.success__inner');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && (evt.target !== newAlert)) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== containerAlert) {
      newAlert.remove();
    }
  });
};

// Функция для удаления элементов из дом дерева
const removeElements = (removedElements) => {
  const elementsToRemove = document.querySelectorAll(removedElements);
  elementsToRemove.forEach((element) => element.remove());
};

// Функция для случайного перемешивания элементов массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { generateRandomInteger, generateRandomArrayElement, generateRandomId, isEscapeKey, getErrorAlert, sendErrorAlert, sendAlert, shuffleArray, removeElements, debounce };
