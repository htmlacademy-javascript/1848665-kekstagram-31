import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator,
} from './util.js';
import { DESCRIPTIONS, MESSEAGES, NAMES } from './data.js';

const MINIMUM_COUNT_LIKES = 15;
const MAXIMUM_COUNT_LIKES = 200;
const MAXIMUM_COUNT_AVATARS = 6;
const MAXIMUM_COUNT_COMMENTS = 6;

const generateCommentId = createIdGenerator();
const generatePhotoDescriptionId = createIdGenerator();
const generatePhotoUrl = createIdGenerator();

// Создание объекта с комментарием
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAXIMUM_COUNT_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSEAGES),
  name: getRandomArrayElement(NAMES),
});

// Создание объекта с описанием фотографии пользователя
const createPhotoDescriptions = () => ({
  id: generatePhotoDescriptionId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MINIMUM_COUNT_LIKES, MAXIMUM_COUNT_LIKES),
  comments: Array.from({length: (getRandomInteger(0, MAXIMUM_COUNT_COMMENTS))}, createComment),
});

// Создание массива описаний фотографий пользователей
const createArrayPhotoDescriptions = (COUNT) => Array.from({length: COUNT}, createPhotoDescriptions);

export { createArrayPhotoDescriptions };
