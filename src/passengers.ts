import { passengers } from "./main"

const passengerNameTextbox = document.getElementById("name-textbox") as HTMLInputElement;

export async function addNewPassenger(flightId: number) {
    const newPassenger = {
        flightId: flightId,
        name: passengerNameTextbox.value,
    };
    // clear out the textbox
    passengerNameTextbox.value = "";
    // create the new passenger on the backend database
    const response = await fetch("http://localhost:3000/passengers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassenger),
    });
    const createdPassengerWithId = await response.json();
    // create the new passenger on the frontend state
    passengers.push(createdPassengerWithId);
    // re-render because the state (frontend data) has updated
    renderPassengers();
}

async function deletePassenger(passengerId: number) {
    // delete the passenger on the backend database
    await fetch("http://localhost:3000/passengers/" + passengerId, {
        method: "DELETE",
    });
    // delete the passenger on the frontend state
    const indexToDelete = passengers.findIndex(
        (passenger) => passenger.id === passengerId
    );
    passengers.splice(indexToDelete, 1);
    // re-render because the state (frontend data) has updated
    renderPassengers();
}

const passengersContainer = document.getElementById("passengers-container") as HTMLTableElement;

export function renderPassengers() {
    passengersContainer.innerHTML = "";
    for (const passenger of passengers) {
        const { name, flightId } = passenger
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${name}</td>
            <td>${flightId}</td>
            <td><button id="delete-button" class="btn btn-danger">Delete</button></td>
        `;
        // grab the button inside the tr and connect the event listsner
        const deleteButton = tr.querySelector(
            "#delete-button"
        ) as HTMLButtonElement;
        deleteButton.addEventListener("click", () => {
            deletePassenger(passenger.id);
        });
        passengersContainer.appendChild(tr);
    }
}
