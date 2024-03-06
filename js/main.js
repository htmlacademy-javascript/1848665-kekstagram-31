import { getArrayPhotoDescriptions } from './create-array-photo-descriptions.js';
import { checkMeetingTime } from './functions.js';

// eslint-disable-next-line
console.log(
  getArrayPhotoDescriptions()
);
// eslint-disable-next-line
console.log(
  checkMeetingTime('8:0', '10:0', '8:0', 120)
);
