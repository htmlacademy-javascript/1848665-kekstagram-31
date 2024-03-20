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

export { generateRandomInteger, generateRandomArrayElement, generateRandomId };
