import { getData } from './api.js';

const ALERT_SHOW_TIME = 5000;

// Функция показа сообщения об ошибке загрузки данных
const getErrorAlert = () => {
  const templateGetAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const newAlert = templateGetAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  setTimeout(() => {
    newAlert.remove();
  }, ALERT_SHOW_TIME);
};

const data = await getData().catch(getErrorAlert);

export { data };
