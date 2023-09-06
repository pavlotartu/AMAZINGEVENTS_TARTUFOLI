const eventsContainer = document.querySelector('#events-container');

const currentPage = window.location.pathname;
let source = '';

if (currentPage.includes('past-events.html')) {
  source = 'past';
} else if (currentPage.includes('upcoming_events.html')) {
  source = 'upcoming';
}

const selectedCategories = [];
const searchTerm = '';

function tarjetas(event) {
  let { image, name, description, price } = event;
  let cardCol = document.createElement('div');
  cardCol.className = 'col-12 col-md-6 col-lg-3 mb-4';

  cardCol.innerHTML = `
    <div class="card h-100">
      <img src="${image}" class="card-img-top" alt="${image}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
        <div class="d-flex justify-content-between align-items-end">
          <p class="card-text">Precio: ${"$" + price}</p>
          <a class="btn btn-primary btn-sm mt-2" href="details.html?event=${encodeURIComponent(JSON.stringify(event))}&source=${source}&categories=${encodeURIComponent(JSON.stringify(selectedCategories))}&search=${encodeURIComponent(searchTerm)}">Ver detalles</a>
        </div>
      </div>
    </div> `;

  return cardCol;
}

async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const dataFromAPI = await response.json();

    dataFromAPI.events.forEach(event => {
      let eventCard = tarjetas(event);
      eventsContainer.appendChild(eventCard);
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

fetchDataFromAPI();
