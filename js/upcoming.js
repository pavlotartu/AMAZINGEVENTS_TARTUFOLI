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

const currentDate = new Date("2023-01-01");
const searchInput = document.getElementById("search-input");

const futureEvents = data.events.filter(event => new Date(event.date) > currentDate);

for (const event of futureEvents) {
  let eventCard = tarjetas(event, 'upcoming');
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

  const filteredEvents = futureEvents
    .filter(event => categories.includes(event.category) || categories.length === 0)
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const noResultsMessage = document.getElementById('no-results-message');

  if (filteredEvents.length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';

    filteredEvents.forEach(event => {
      let eventCard = tarjetas(event, 'upcoming');
      eventsContainer.appendChild(eventCard);
    });
  }
}

function showAllCards() {
  eventsContainer.innerHTML = '';
  categoryCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  for (const event of futureEvents) {
    let eventCard = tarjetas(event, 'upcoming');
    eventsContainer.appendChild(eventCard);
  }
}
