import {
  generateRandomInteger,
  generateRandomArrayElement,
  generateRandomId,
} from './util.js';
import { DESCRIPTIONS, MESSEAGES, NAMES } from './data.js';

const MINIMUM_COUNT_LIKES = 15;
const MAXIMUM_COUNT_LIKES = 200;
const MAXIMUM_COUNT_AVATARS = 6;
const MAXIMUM_COUNT_COMMENTS = 30;

const generateCommentId = generateRandomId();
const generateThumbnailId = generateRandomId();
const generateThumbnailUrl = generateRandomId();

// Создание объекта комментариев
const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateRandomInteger(1, MAXIMUM_COUNT_AVATARS)}.svg`,
  message: generateRandomArrayElement(MESSEAGES),
  name: generateRandomArrayElement(NAMES),
});

// Создание объекта миниатюры
const generateThumbnail = () => ({
  id: generateThumbnailId(),
  url: `photos/${generateThumbnailUrl()}.jpg`,
  description: generateRandomArrayElement(DESCRIPTIONS),
  likes: generateRandomInteger(MINIMUM_COUNT_LIKES, MAXIMUM_COUNT_LIKES),
  comments: Array.from({length: (generateRandomInteger(0, MAXIMUM_COUNT_COMMENTS))}, generateComment),
});

// Создание массива миниатюр
const generateThumbnailArray = (COUNT) => Array.from({length: COUNT}, generateThumbnail);

export { generateThumbnailArray };
