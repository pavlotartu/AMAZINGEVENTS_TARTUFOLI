const eventDetailsContainer = document.getElementById('eventDetailsContainer');

const urlParams = new URLSearchParams(window.location.search);
const eventParam = urlParams.get('event');
const sourceParam = urlParams.get('source');

if (eventParam) {
    const event = JSON.parse(decodeURIComponent(eventParam));
    const source = sourceParam || 'default';
    displayEventDetails(event, source);
} else {
    eventDetailsContainer.textContent = 'No se ha proporcionado información del evento.';
}

function displayEventDetails(event, source) {
    const { name, image, date, description, category, place, capacity, assistance, estimate, price } = event;

    const eventDetails = document.createElement('div');
    eventDetails.className = 'row';

    let detailsHTML = `
        <div class="col-md-14 ">
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${image}" alt="${name}" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text"><strong>Fecha:</strong> ${date}</p>
                            <p class="card-text"><strong>Descripción:</strong> ${description}</p>
                            <p class="card-text"><strong>Categoría:</strong> ${category}</p>
                            <p class="card-text"><strong>Lugar:</strong> ${place}</p>
                            <p class="card-text"><strong>Capacidad:</strong> ${capacity}</p>
    `;

    if (assistance !== undefined) {
        detailsHTML += `<p class="card-text"><strong>Asistencia:</strong> ${assistance}</p>`;
    } else if (estimate !== undefined) {
        detailsHTML += `<p class="card-text"><strong>Estimado:</strong> ${estimate}</p>`;
    }

    detailsHTML += `
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="card-text"><strong>Precio:</strong> ${"$" + price}</p>
                                <a href="${getBackLink(source)}" class="btn btn-primary">Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    eventDetails.innerHTML = detailsHTML;
    eventDetailsContainer.appendChild(eventDetails);
}

function getBackLink(source) {
    if (source === 'past') {
        return '../past-events.html';
    } else if (source === 'upcoming') {
        return '../upcoming_events.html';
    } else {
        return '../index.html';
    }
}
