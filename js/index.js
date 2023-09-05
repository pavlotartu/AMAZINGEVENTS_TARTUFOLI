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

  input.type = "checkbox";
  input.name = "category";
  input.value = category;

  span.textContent = category;

  label.appendChild(input);
  label.appendChild(span);
  th.appendChild(label);

  categoryRow.appendChild(th);
});

for (const event of data.events) {
  let eventCard = tarjetas(event, 'index');
  eventsContainer.appendChild(eventCard);
}

const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

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

function filterAndShowCards(selectedCategories, searchTerm) {
  eventsContainer.innerHTML = '';

  const filteredEvents = data.events
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

function showAllCards() {
  eventsContainer.innerHTML = '';
  categoryCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  for (const event of data.events) {
    let eventCard = tarjetas(event);
    eventsContainer.appendChild(eventCard);
  }
}