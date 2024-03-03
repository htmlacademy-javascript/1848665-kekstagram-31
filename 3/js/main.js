const DESCRIPTIONS = [
  'Рыбалка с друзьями',
  'Мой новый автомобиль',
  'Всем привет, это я',
  'Очень красивый букет!',
  'Заказали с подругами роллы',
  'Продается гараж, писать в ЛС',
];

const MESSEAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Александр',
  'Сергей',
  'Анастасия',
  'Мария',
  'Екатерина',
];

// Получение рандомного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let descriptionId = 0;

let commentId = 0;

let photosUrl = 0;

// Создание объекта с комментарием
const createComment = () => {
  commentId++;
  return {
    id: commentId, // Число. Идентификаторы не должны повторяться.
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSEAGES),
    name: getRandomArrayElement(NAMES),
  };
};

// Создание объекта с описанием фотографии пользователя
const createDescriptionPhotoUser = () => {
  descriptionId++;
  photosUrl++;
  return {
    id: descriptionId,
    url: `photos/${photosUrl}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: (getRandomInteger(0, 30))}, createComment),
  };
};

// Количество сгенерированных элементов массива
const PHOTO_USER_COUNT = 25;

// Создание массива описаний фотографий пользователей
// eslint-disable-next-line
const DescriptionPhotoUsers = Array.from({length: PHOTO_USER_COUNT}, createDescriptionPhotoUser);
