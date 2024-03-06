import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const PHOTO_USER_COUNT = 25;
const MINIMUM_COUNT_LIKES = 15;
const MAXIMUM_COUNT_LIKES = 200;
const MAXIMUM_COUNT_AVATARS = 6;
const MAXIMUM_COUNT_COMMENTS = 6;

// Массив описаний фотографий
const DESCRIPTIONS = [
  'Рыбалка с друзьями',
  'Мой новый автомобиль',
  'Всем привет, это я',
  'Очень красивый букет!',
  'Заказали с подругами роллы',
  'Продается гараж, писать в ЛС',
];

// Массив текстов комментария
const MESSEAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Массив имен комментаторов
const NAMES = [
  'Иван',
  'Александр',
  'Сергей',
  'Анастасия',
  'Мария',
  'Екатерина',
];

// Переменная счетчика идентификаторов комментариев
const generateCommentId = createIdGenerator();

// Переменная счетчика идентификаторов описаний фотографий
const generateDescriptionPhotoId = createIdGenerator();

// Переменная счетчика адресов фотографий
const generateUrlPhoto = createIdGenerator();

// Создание объекта с комментарием
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAXIMUM_COUNT_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSEAGES),
  name: getRandomArrayElement(NAMES),
});

// Создание объекта с описанием фотографии пользователя
const createDescriptionPhoto = () => ({
  id: generateDescriptionPhotoId(),
  url: `photos/${generateUrlPhoto()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MINIMUM_COUNT_LIKES, MAXIMUM_COUNT_LIKES),
  comments: Array.from({length: (getRandomInteger(0, MAXIMUM_COUNT_COMMENTS))}, createComment),
});

// Создание массива описаний фотографий пользователей
const descriptionPhotos = () => Array.from({length: PHOTO_USER_COUNT}, createDescriptionPhoto);

export {descriptionPhotos};
