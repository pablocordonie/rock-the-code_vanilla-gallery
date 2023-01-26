import { MOCK_CARDS, /* TECHNOLOGIES_URL */ } from './constants';
import './style.css';

// Setup

const appElement = document.getElementById('app');

const getModalTemplate = () => `
  <div id="rockTheCode-modal" class="rockTheCode-modal">
    <div class="modal-header">
      <h2 id="modal-title"></h2>
      <button id="modal-close">✖️</button>
    </div>
    <div class="modal-body"></div>
  </div>
`;

const getContainerTemplate = () => `
  <div id="rockTheCode-gallery" class="rockTheCode-gallery">
    <h1>Loading... ⏳️</h1>
  </div>
`;

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

// Logic

const modalElement = document.getElementById('rockTheCode-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.querySelector('.modal-body');

const galleryElement = document.getElementById('rockTheCode-gallery');
const loadingElement = document.querySelector('#rockTheCode-gallery > h1');
let currentCard;

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
  <div class="card" role="button" id="${card._id}">
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

const getModalBodyTemplate = (cardData) => `
  <img src="${cardData.logo}" alt="${cardData.name}" />
  <h3>Valoración de ${cardData.score.toFixed(2)} con ${cardData.reviews} reviews</h3>
  <div class="review-container">
    <button data-score="1">⭐️</button>
    <button data-score="2">⭐️</button>
    <button data-score="3">⭐️</button>
    <button data-score="4">⭐️</button>
    <button data-score="5">⭐️</button>
  </div>
`;

const setupModalData = (cardData) => {
  currentCard = cardData;
  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
};

const handleOpenModal = (event) => {
  const cardId = event.target.id;
  const cardData = MOCK_CARDS.find((card) => card._id === cardId);
  setupModalData(cardData);
  modalElement.style.display = 'block';
};

const addCardsListeners = () => {
  const cards = document.querySelectorAll('.rockTheCode-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
};

const addModalListeners = () => {
  const closeButton = document.querySelector('#rockTheCode-modal #modal-close');
  closeButton.addEventListener('click', () => {
    modalElement.style.display = 'none';
  });

}

setupCards();
addCardsListeners();
addModalListeners();