import { el, empty } from './helpers';
import { loadSavedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters = document.querySelectorAll('.filters__filter');
    this.url = 'lectures.json';
  }

  setContent(...content) {
    empty(this.container);

    content.forEach((item) => {
      const contentToShow = typeof item === 'string'
        ? document.createTextNode(item) : item;

      this.container.appendChild(contentToShow);
    });
  }

  setError(error) {
    const errorElement = el('div', error);
    errorElement.classList.add('list__error');
    this.setContent(errorElement);
  }

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      });
  }

  filterLectures(data) {
    const activeFilters = Array.from(this.filters)
      .filter(i => i.classList.contains('filters__filter--active'))
      .map(i => i.dataset.category);

    return data.filter(i => activeFilters.length === 0 || activeFilters.indexOf(i.category) >= 0);
  }

  addSavedLectures(data) {
    const saved = loadSavedLectures();

    return data.map((i) => {
      i.finished = saved.indexOf(i.slug) >= 0; /* eslint-disable-line */

      return i;
    });
  }

  renderItem(data) {
    const image = el('div');
    image.classList.add('listItem__image');

    if (data.thumbnail) {
      const img = el('img');
      img.setAttribute('src', data.thumbnail);
      img.setAttribute('alt', '');
      image.appendChild(img);
    } else {
      image.classList.add('listItem__image--empty');
    }

    const category = el('span', data.category);
    category.classList.add('listItem__category');

    const heading = el('h2', data.title);
    heading.classList.add('listItem__title');

    const textElements = el('div', category, heading);
    textElements.classList.add('listItem__texts');

    const text = el('div', textElements);
    text.classList.add('listItem__bottom');

    if (data.finished) {
      const finished = el('div', '✓');
      finished.classList.add('listItem__finished');
      text.appendChild(finished);
    }

    const item = el('a', image, text);
    item.classList.add('listItem');
    item.setAttribute('href', `fyrirlestur.html?slug=${data.slug}`);

    return item;
  }

  renderLectures(data) {
    const items = data.map((item) => {
      const col = el('div', this.renderItem(item));
      col.classList.add('list__col');
      return col;
    });

    const row = el('div', ...items);
    row.classList.add('list__row');

    this.setContent(row);
  }

  toggleFilter(e) {
    const { target } = e;
    target.classList.toggle('filters__filter--active');

    // todo refactor
    this.loadLectures()
      .then(data => this.addSavedLectures(data.lectures))
      .then(data => this.filterLectures(data))
      .then(data => this.renderLectures(data))
      .catch((error) => {
        console.error(error);
        this.setError(error.message);
      });
  }

  setupFilters() {
    this.filters.forEach((filter) => {
      filter.addEventListener('click', this.toggleFilter.bind(this));
    });
  }

  load() {
    this.loadLectures()
      .then(data => this.addSavedLectures(data.lectures))
      .then(data => this.filterLectures(data))
      .then(data => this.renderLectures(data))
      .catch((error) => {
        console.error(error);
        this.setError(error.message);
      });

    this.setupFilters();
  }
}
