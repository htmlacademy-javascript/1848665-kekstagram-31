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

export { generateRandomInteger, generateRandomArrayElement, generateRandomId, isEscapeKey, getErrorAlert, sendErrorAlert, sendAlert };
