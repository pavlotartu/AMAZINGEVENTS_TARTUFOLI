async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const dataFromAPI = await response.json();

    return dataFromAPI.events;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

async function initialize() {
  const data = await fetchDataFromAPI();
  const categoriesSet = new Set();

  data.forEach(event => {
    categoriesSet.add(event.category);
  });

  const sortedCategories = Array.from(categoriesSet).sort();
  const categoryRow = document.getElementById("categoryRow");

  sortedCategories.forEach(category => {
    const th = document.createElement("th");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    input.type = "checkbox";
    input.name = "category";
    input.value = category;

    span.textContent = category;

    label.appendChild(input);
    label.appendChild(span);
    th.appendChild(label);

    categoryRow.appendChild(th);
  });

  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  const currentDate = new Date("2023-03-10");
  const futureEvents = data.filter(event => new Date(event.date) >= currentDate);

  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
      const searchTerm = searchInput.value;
      filterAndShowCards(futureEvents, selectedCategories, searchTerm);
    });
  });

  searchInput.addEventListener("input", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
    const searchTerm = searchInput.value;
    filterAndShowCards(futureEvents, selectedCategories, searchTerm);
  });

  showAllCards(futureEvents);
}

function filterAndShowCards(data, selectedCategories, searchTerm) {
  eventsContainer.innerHTML = '';

  const filteredEvents = data
    .filter(event => selectedCategories.includes(event.category) || selectedCategories.length === 0)
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const noResultsMessage = document.getElementById('no-results-message');

  if (filteredEvents.length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';

    filteredEvents.forEach(event => {
      let eventCard = tarjetas(event);
      eventsContainer.appendChild(eventCard);
    });
  }
}

function showAllCards(data) {
  eventsContainer.innerHTML = '';
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  for (const event of data) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}

initialize();