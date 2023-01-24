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
let cards;

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
  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

/*const apiRequest = fetch(TECHNOLOGIES_URL);
console.log(apiRequest);

setupCards();

vídeo Proyecto Gallery -2 -> min. 05:40 */