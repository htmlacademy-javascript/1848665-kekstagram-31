// Получение рандомного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Счетчик на замыкании
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export { getRandomInteger, getRandomArrayElement, createIdGenerator };
