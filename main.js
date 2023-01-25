import { MOCK_CARDS, TECHNOLOGIES_URL } from './constants';
import './style.css';

// Setup

const appElement = document.getElementById('app');

const getContainerTemplate = () => `
  <div id="rockTheCode-gallery" class="rockTheCode-gallery">
    <h1>Loading... ⏳️</h1>
  </div>
`;

appElement.innerHTML += getContainerTemplate();

// Logic

const galleryElement = document.getElementById('rockTheCode-gallery');
const loadingElement = document.querySelector('#rockTheCode-gallery > h1');

const setupStars = (score) => {

  if (!score) {
    return `<p class="no-rating">No ratings</p>`;
  }

  let starContainer = [];

  for (let i = 1; i < score; i++) {
    starContainer.push(`<span class="star">⭐️</span>`);
  }

  return starContainer.join(' ');
};

const getCardTemplate = (card) => `
  <div class="card">
    <h3>${card.name}</h3>
    <div class="image-container">
      <img src="${card.logo}" alt="${card.name}" />
    </div>
    <div class="score-container">${setupStars(card.score)}</div>
  </div>
`;

const setupCards = () => {
  loadingElement.remove();

  MOCK_CARDS.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

/* En el caso de usar una API con cards...
let cards;

const setupCards = () => {
  loadingElement.remove();

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

// Alternativa 1

fetch(TECHNOLOGIES_URL)
  .then((res) => res.json())
  .then((cardsData) => {
    cards = cardsData;
    setupCards();
  })
  .catch((err) => {
    loadingElement.innerText = 'Carga fallida 😔️';
    console.error(err);
  });

// Alternativa 2

const getTechnologies = async () => {
  try {
    throw new Error('Carga fallida 😔️');
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();

    cards = cardsData;
    setupCards();
  } catch (err) {
    loadingElement.innerText = `${err}`;
  }
};

getTechnologies();

*/

setupCards();