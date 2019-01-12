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

const html = createHtml();

// Skilar DOM hlut frá jsdom
console.log(html);

// Fáum HTML úr DOM hlut
console.log(html.outerHTML);
