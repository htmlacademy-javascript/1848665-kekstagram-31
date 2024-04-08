import { removeElements } from './util';

const filters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const AMOUNT_RANDOM_ELEMENTS = 10;

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const filteredThumbnails = (callback, arrayThumbnails) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.id === 'filter-default') {
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      removeElements('.picture');
      callback(arrayThumbnails);
    }

    if (evt.target.id === 'filter-discussed') {
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      const arrayByDiscussion = arrayThumbnails.slice().sort((a, b) => b.comments.length - a.comments.length);
      removeElements('.picture');
      callback(arrayByDiscussion);
    }

    if (evt.target.id === 'filter-random') {
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      const shuffledArray = [...arrayThumbnails].sort(() => 0.5 - Math.random());
      const randomUniqueValues = shuffledArray.slice(0, AMOUNT_RANDOM_ELEMENTS);
      removeElements('.picture');
      callback(randomUniqueValues);
    }
  });
};

export { showFilters, filteredThumbnails };

