const categoriesSet = new Set();

// Iteramos sobre los eventos en data y agregamos las categorías al Set
data.events.forEach(event => {
  categoriesSet.add(event.category);
});

// Convertimos el Set en un array y lo ordenamos alfabéticamente
const sortedCategories = Array.from(categoriesSet).sort();

const categoryRow = document.getElementById("categoryRow");

// Creamos las etiquetas de radio y sus textos de categoría
const allOption = document.createElement("th");
const allLabel = document.createElement("label");
const allInput = document.createElement("input");
const allSpan = document.createElement("span");

allInput.type = "radio";
allInput.name = "category";
allInput.value = ""; // Valor vacío para mostrar todas las tarjetas

allSpan.textContent = "Todas"; // Texto para deseleccionar

allLabel.appendChild(allInput);
allLabel.appendChild(allSpan);
allOption.appendChild(allLabel);

categoryRow.appendChild(allOption);

sortedCategories.forEach(category => {
  const th = document.createElement("th");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.type = "radio";
  input.name = "category";
  input.value = category;

  span.textContent = category;

  label.appendChild(input);
  label.appendChild(span);
  th.appendChild(label);

  categoryRow.appendChild(th);
});

const currentDate = new Date("2023-01-01"); // Cambiar la fecha aquí
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

for (const event of data.events) {
  let eventDate = new Date(event.date);
  if (eventDate <= currentDate) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}

// Obtener una referencia a los elementos de los checkboxes
const categoryCheckboxes = document.querySelectorAll('input[type="radio"][name="category"]');

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedCategory = checkbox.value;
    const searchTerm = searchInput.value;
    filterAndShowCards(selectedCategory, searchTerm);
  });
});

// Agregar evento de escucha al campo de búsqueda mientras se escribe
searchInput.addEventListener("input", () => {
  const selectedCategory = document.querySelector('input[type="radio"][name="category"]:checked').value;
  const searchTerm = searchInput.value;
  filterAndShowCards(selectedCategory, searchTerm);
});

// Función para filtrar y mostrar las tarjetas según la categoría seleccionada y la búsqueda
function filterAndShowCards(category, searchTerm) {
  // Limpiar el contenedor de tarjetas
  eventsContainer.innerHTML = '';

  // Filtrar los eventos según la categoría seleccionada y mostrar las tarjetas correspondientes
  data.events.filter(event => new Date(event.date) <= currentDate && (event.category === category || category === ""))
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .forEach(event => {
      let eventCard = tarjetas(event);
      eventsContainer.appendChild(eventCard);
    });
}

// Función para mostrar todas las tarjetas anteriores a la fecha
function showAllCards() {
  eventsContainer.innerHTML = '';

  for (const event of data.events) {
    let eventDate = new Date(event.date);
    if (eventDate <= currentDate) {
      let eventCard = tarjetas(event);
      eventsContainer.appendChild(eventCard);
    }
  }
}


