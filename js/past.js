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

  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
      const searchTerm = searchInput.value;
      filterAndShowCards(data, selectedCategories, searchTerm);
    });
  });

  searchInput.addEventListener("input", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.value);
    const searchTerm = searchInput.value;
    filterAndShowCards(data, selectedCategories, searchTerm);
  });

  showAllCards(data);
}

function filterAndShowCards(data, selectedCategories, searchTerm) {
  eventsContainer.innerHTML = '';

  const currentDate = new Date("2023-01-01");
  const pastEvents = data.filter(event => new Date(event.date) <= currentDate);

  const filteredEvents = pastEvents
    .filter(event => selectedCategories.includes(event.category) || selectedCategories.length === 0)
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredEvents.length === 0) {
    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = 'block';
  } else {
    const noResultsMessage = document.getElementById('no-results-message');
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

  const currentDate = new Date("2023-03-10");
  const pastEvents = data.filter(event => new Date(event.date) <= currentDate);

  for (const event of pastEvents) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}

initialize();