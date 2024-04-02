const thumbnailList = document.querySelector('.pictures');
const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (thumbnails) => {
  const thumbnailCardListFragment = document.createDocumentFragment();

  thumbnails.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = templateThumbnail.cloneNode(true);
    thumbnail.dataset.pictureId = id;
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailCardListFragment.appendChild(thumbnail);
  });

  // Добавление фрамента с миниатюрами в список
  return thumbnailList.appendChild(thumbnailCardListFragment);
};

export { renderThumbnails };
