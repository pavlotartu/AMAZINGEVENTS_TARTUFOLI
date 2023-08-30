const categoriesSet = new Set();

data.events.forEach(event => {
  categoriesSet.add(event.category);
});

const sortedCategories = Array.from(categoriesSet).sort();
const categoryRow = document.getElementById("categoryRow");

sortedCategories.forEach(category => {
  const th = document.createElement("th");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.type = "checkbox"; // Cambiar de "radio" a "checkbox"
  input.name = "category";
  input.value = category;

  span.textContent = category;

  label.appendChild(input);
  label.appendChild(span);
  th.appendChild(label);

  categoryRow.appendChild(th);
})

const currentDate = new Date("2023-01-01");
const eventsContainer = document.querySelector('#events-container');
const searchInput = document.getElementById("search-input");

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
      <a class="btn btn-primary btn-sm mt-2">Ver detalles</a>
    </div>
  </div>
</div> `;
    return cardCol;
}

const pastEvents = data.events.filter(event => new Date(event.date) <= currentDate);

for (const event of pastEvents) {
  let eventCard = tarjetas(event);
  eventsContainer.appendChild(eventCard);
}

const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
    const searchTerm = searchInput.value;
    filterAndShowCards(selectedCategories, searchTerm);
  });
});

searchInput.addEventListener("input", () => {
  const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
  const searchTerm = searchInput.value;
  filterAndShowCards(selectedCategories, searchTerm);
});

function filterAndShowCards(categories, searchTerm) {
  eventsContainer.innerHTML = '';
  pastEvents.filter(event => categories.includes(event.category) || categories.length === 0)
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .forEach(event => {
      let eventCard = tarjetas(event);
      eventsContainer.appendChild(eventCard);
    });
}

function showAllCards() {
  eventsContainer.innerHTML = '';
  for (const event of pastEvents) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}