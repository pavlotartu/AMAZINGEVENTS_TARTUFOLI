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
})

const currentDate = new Date("2023-01-01");
const searchInput = document.getElementById("search-input");

const pastEvents = data.events.filter(event => new Date(event.date) <= currentDate);

for (const event of pastEvents) {
  let eventCard = tarjetas(event, 'past');
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
  const filteredEvents = pastEvents
    .filter(event => categories.includes(event.category) || categories.length === 0)
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredEvents.length === 0) {
    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = 'block';
  } else {
    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = 'none';

    filteredEvents.forEach(event => {
      let eventCard = tarjetas(event, 'past');
      eventsContainer.appendChild(eventCard);
    });
  }
}

function showAllCards() {
  eventsContainer.innerHTML = '';
  for (const event of pastEvents) {
    let eventCard = tarjetas(event, 'past');
    eventsContainer.appendChild(eventCard);
  }
}
