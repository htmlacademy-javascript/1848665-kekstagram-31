import { openBigPicture } from './picture-modal.js';
import { thumbnailList } from './render-thumbnails.js';

thumbnailList.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');
  if (currentThumbnail) {
    openBigPicture(currentThumbnail.dataset.pictureId);
  }
});
