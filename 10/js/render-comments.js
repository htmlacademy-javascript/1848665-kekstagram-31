const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const commentUploadButton = bigPicture.querySelector('.comments-loader');
const countShownComments = bigPicture.querySelector('.social__comment-shown-count');

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const newComment = templateComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(newComment);
  });

  commentsList.appendChild(socialCommentsFragment);

  if (renderedCommentsLength >= comments.length) {
    commentUploadButton.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
  countShownComments.textContent = renderedCommentsLength;
};

const renderComments = (currentComments) => {
  comments = currentComments;

  renderNextComments();
  commentUploadButton.addEventListener('click', renderNextComments);
};

const clearComments = () => {
  currentCount = 0;
  commentsList.innerHTML = '';
  commentUploadButton.removeEventListener('click', renderNextComments);
  commentUploadButton.classList.remove('hidden');
};

export { clearComments, renderComments };
