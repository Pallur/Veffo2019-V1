const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { document } = (new JSDOM()).window;

function createHtml() {
  const wrapper = document.createElement('div');

  // jsdom útfærir DOM staðal
  wrapper.classList.add('reciepe');
  wrapper.dataset.foo = 'bar';

  const ul = document.createElement('ol');

  const steps = [
    'Blanda saman vatni, brauði, salti og geri',
    'Hnoða',
    'Lyfta',
    'Baka',
    'Borða'
  ];

  steps.forEach((step) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(step));
    ul.appendChild(li);
  });

  wrapper.appendChild(ul);

  return wrapper;

}

function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    for (let child of children) { /* eslint-disable-line */
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }

  return element;
}