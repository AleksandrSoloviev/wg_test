import { renderCards } from '../features/cards/render-cards.js';

const tnk = ['T-34', 'KV-1', 'T-150', 'IS-3', 'ST-1', 'Object-752'];

const data = tnk.map((name, i) => ({
  id: i + 1,
  title: name,
  info: `Описание танка ${name}`,
}));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const btn = document.getElementById('scroll-to-top-btn');
btn.addEventListener('click', scrollToTop);

const container = document.getElementById('cards');
renderCards(container, data);
