import { createArrayPhotoDescriptions } from './create-array-photo-descriptions.js';
import { checkMeetingTime } from './functions.js';
import './create-photo-descriptions.js';

// eslint-disable-next-line
console.log(
  createArrayPhotoDescriptions()
);
// eslint-disable-next-line
console.log(
  checkMeetingTime('8:0', '10:0', '8:0', 120)
);
