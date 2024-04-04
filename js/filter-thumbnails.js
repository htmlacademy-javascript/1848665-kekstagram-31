import { shuffleArray, removeElements, debounce } from './util';

const AMOUNT_RANDOM_ELEMENTS = 10;
const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const filteredThumbnails = (callback, arrayThumbnails) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.id === 'filter-default') {
      removeElements('.picture');
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      debounce(callback(arrayThumbnails), RERENDER_DELAY);
    }

    if (evt.target.id === 'filter-discussed') {
      removeElements('.picture');
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      const arrayByDiscussion = arrayThumbnails.slice().sort((a, b) => b.comments.length - a.comments.length);
      debounce(callback(arrayByDiscussion), RERENDER_DELAY);
    }

    if (evt.target.id === 'filter-random') {
      removeElements('.picture');
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      const shuffledArray = shuffleArray([...arrayThumbnails]);
      const randomUniqueValues = [...new Set(shuffledArray)].slice(0, AMOUNT_RANDOM_ELEMENTS);
      debounce(callback(randomUniqueValues), RERENDER_DELAY);
    }
  });
};

export { showFilters, filteredThumbnails };

