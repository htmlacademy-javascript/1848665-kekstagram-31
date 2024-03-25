import { openBigPicture } from './open-big-picture.js';
import { thumbnailList } from './render-thumbnails.js';
import { pictureUploadInput, openPictureEditForm } from './open-picture-edit-form.js';

thumbnailList.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');
  if (currentThumbnail) {
    openBigPicture(currentThumbnail.dataset.pictureId);
  }
});

pictureUploadInput.addEventListener('change', (evt) => {
  const selectedPicture = evt.target.files[0];
  if (selectedPicture) {
    openPictureEditForm(selectedPicture);
  }
});
