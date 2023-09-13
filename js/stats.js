//tabla01

let tbody = document.querySelector("#statsTable tbody");

if (tbody) {
    let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let highestAssistanceEvents = data.events.slice(0, 3);
            let sortedEventsByAssistance = data.events.sort((a, b) => a.assistance - b.assistance);
            let lowestAssistanceEvents = sortedEventsByAssistance.slice(0, 3);
            let sortedEventsByCapacity = data.events.sort((a, b) => b.capacity - a.capacity);
            let largeCapacityEvents = sortedEventsByCapacity.slice(0, 3);

            tbody.innerHTML = '';

            for (let i = 0; i < 3; i++) {
                let newRow = tbody.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                cell1.textContent = highestAssistanceEvents[i].name;
                cell2.textContent = lowestAssistanceEvents[i].name;
                cell3.textContent = largeCapacityEvents[i].name;

                cell1.classList.add("text-center", "text-xs");
                cell2.classList.add("text-center", "text-xs");
                cell3.classList.add("text-center", "text-xs");
            }
        })
        .catch(error => {
            console.error("Error al obtener datos de la API: " + error);
        });
} else {
    console.error("El tbody de la tabla no se encontró en el documento.");
}

//tabla02

let upcomingEventsTbody = document.querySelector("#upcomingEventsTable tbody");

if (upcomingEventsTbody) {
    let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date("2023-03-10");
            const upcomingEvents = data.events.filter(event => new Date(event.date) > currentDate);

            const categoryTotals = {}; // Cambiado a categoryTotals

            upcomingEvents.forEach(event => {
                const categoryName = event.category;
                const categoryRevenue = event.estimate * event.price;

                if (!categoryTotals[categoryName]) { // Cambiado a categoryTotals
                    categoryTotals[categoryName] = {
                        totalEstimate: 0,
                        totalCapacity: 0,
                        totalRevenue: 0
                    };
                }

                categoryTotals[categoryName].totalEstimate += event.estimate; // Sumar estimado
                categoryTotals[categoryName].totalCapacity += event.capacity; // Sumar capacidad
                categoryTotals[categoryName].totalRevenue += categoryRevenue; // Sumar ingresos
            });

            upcomingEventsTbody.innerHTML = '';

            // Calcular y mostrar los ingresos y el porcentaje de asistencia para cada categoría
            for (const categoryName in categoryTotals) {
                const totalEstimate = categoryTotals[categoryName].totalEstimate;
                const totalCapacity = categoryTotals[categoryName].totalCapacity;
                const totalRevenue = categoryTotals[categoryName].totalRevenue;
                const percentageAttendance = (totalEstimate * 100) / totalCapacity;

                let newRow = upcomingEventsTbody.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                cell1.textContent = categoryName;
                cell2.textContent = "$" + totalRevenue.toFixed(2);
                cell3.textContent = percentageAttendance.toFixed(2) + "%";

                cell1.classList.add("text-center", "text-xs");
                cell2.classList.add("text-center", "text-xs");
                cell3.classList.add("text-center", "text-xs");
            }
        })
        .catch(error => {
            console.error("Error al obtener datos de la API: " + error);
        });
} else {
    console.error("El tbody de la segunda tabla no se encontró en el documento.");
}


//tabla03

function calcularEstadisticasEventosPasados() {
    let pastEventsTbody = document.querySelector("#pastEventsTable tbody");

    if (pastEventsTbody) {
        let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date("2023-03-10");
                const pastEvents = data.events.filter(event => new Date(event.date) < currentDate);

                const categoryTotals = {};

                pastEvents.forEach(event => {
                    const categoryName = event.category;
                    const categoryAssistance = event.assistance;
                    const categoryRevenue = categoryAssistance * event.price;

                    if (!categoryTotals[categoryName]) {
                        categoryTotals[categoryName] = {
                            totalAssistance: 0,
                            totalRevenue: 0,
                            totalCapacity: 0
                        };
                    }

                    categoryTotals[categoryName].totalAssistance += categoryAssistance;
                    categoryTotals[categoryName].totalRevenue += categoryRevenue;
                    categoryTotals[categoryName].totalCapacity += event.capacity;
                });

                pastEventsTbody.innerHTML = '';

                for (const categoryName in categoryTotals) {
                    const totalAssistance = categoryTotals[categoryName].totalAssistance;
                    const totalRevenue = categoryTotals[categoryName].totalRevenue;
                    const totalCapacity = categoryTotals[categoryName].totalCapacity;
                    const percentageAssistance = (totalAssistance * 100) / totalCapacity;

                    let newRow = pastEventsTbody.insertRow();
                    let cell1 = newRow.insertCell(0);
                    let cell2 = newRow.insertCell(1);
                    let cell3 = newRow.insertCell(2);
                    cell1.textContent = categoryName;
                    cell2.textContent = "$" + totalRevenue.toFixed(2);
                    cell3.textContent = percentageAssistance.toFixed(2) + "%";

                    cell1.classList.add("text-center", "text-xs");
                    cell2.classList.add("text-center", "text-xs");
                    cell3.classList.add("text-center", "text-xs");
                }
            })
            .catch(error => {
                console.error("Error al obtener datos de la API: " + error);
            });
    } else {
        console.error("El tbody de la tercera tabla no se encontró en el documento.");
    }
}

calcularEstadisticasEventosPasados();
