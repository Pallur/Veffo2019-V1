const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { document } = (new JSDOM()).window;

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

module.exports = {
 createContent(content) {
  const col = el('div');
  col.classList.add('lecture__col');
  const row = el('div', col);
  row.classList.add('lecture__row');
  const wrapper = el('div', row);
  wrapper.classList.add('lecture__content');

  content.forEach((i) => {
    let item;
    switch (i.type) {
      case 'youtube':
        item = youtube(i.data);
        break;
      case 'text':
        item = text(i.data);
        break;
      case 'list':
        item = list(i.data);
        break;
      case 'heading':
        item = heading(i.data);
        break;
      case 'code':
        item = code(i.data);
        break;
      case 'quote':
        item = quote(i.data, i.attribute);
        break;
      case 'image':
        item = image(i.data, i.caption);
        break;
      default:
        item = el('div', i.type);
    }

    col.appendChild(item);
  });

  return wrapper.outerHTML;
  },
};

function item(type, ...data) {
  const content = el('div', ...data);
  content.classList.add('item__content');

  const wrapper = el('div', content);
  wrapper.classList.add('item', `item--${type}`);

  return wrapper;
}

function text(data) {
  const split = data.split('\n');

  const texts = split.map((t) => {
    const p = el('p', t);
    p.classList.add('item__text');
    return p;
  });

  return item('text', ...texts);
}

function quote(data, attribute) {
  const quoteText = el('p', data);
  quoteText.classList.add('item__quote');

  const quoteAttribute = el('p', attribute);
  quoteAttribute.classList.add('item__attribute');

  const blockquote = el('blockquote', quoteText, quoteAttribute);

  return item('blockquote', blockquote);
}

function heading(data) {
  const element = el('h3', data);
  element.classList.add('item__heading');

  return item('heading', element);
}

function list(data) {
  const items = data.map((i) => {
    const li = el('li', i);
    li.classList.add('item__li');
    return li;
  });

  const ul = el('ul', ...items);
  ul.classList.add('item__ul');

  return item('list', ul);
}

function code(data) {
  const element = el('pre', data);
  element.classList.add('item__code');

  return item('code', element);
}

function youtube(url) {
  const iframe = el('iframe');
  iframe.classList.add('item__iframe');
  iframe.setAttribute('src', url);
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('allowfullscreen', true);

  return item('youtube', iframe);
}

function image(data, caption) {
  const imageElement = el('img');
  imageElement.classList.add('image__img');
  imageElement.setAttribute('alt', caption);
  imageElement.setAttribute('src', data);

  const imageAttribution = el('p', caption);
  imageAttribution.classList.add('item__caption');

  const blockquote = el('div', imageElement, imageAttribution);

  return item('image', blockquote);
}
