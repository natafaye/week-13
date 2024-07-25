import { flights } from "./main.ts"
import { addNewPassenger } from "./passengers";

const flightsContainer = document.getElementById("flight-container") as HTMLTableElement;

// Render = render pased on the state
export function renderFlights() {
    // clear it out
    flightsContainer.innerHTML = "";
    // put it all in
    for (const flight of flights) {
        const { name, departureTime } = flight
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${name}</td>
            <td>${departureTime}:00pm</td>
            <td><button id="book-button" class="btn btn-primary">Book flight</button></td>
        `;
        // grab the button inside the tr and connect the event listsner
        const bookButton = tr.querySelector("#book-button") as HTMLButtonElement;
        bookButton.addEventListener("click", () => {
            addNewPassenger(flight.id);
        });
        flightsContainer.appendChild(tr);
    }
}
