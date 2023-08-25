let currentDate = new Date(data.currentDate);
let eventsContainer = document.querySelector('#events-container');

function tarjetas(event) {
  let { image, name, description, date, price } = event;

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
      <a class="btn btn-primary btn-sm mt-2">Ver detalles</a>
    </div>
  </div>
</div> `;

  return cardCol;
}

for (const event of data.events) {
  let eventDate = new Date(event.date);
  if (eventDate >= currentDate) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}
