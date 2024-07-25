import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { renderFlights } from "./flights"
import { renderPassengers } from "./passengers"

type Flight = {
  id: number;
  name: string;
  departureTime: number;
};
export let flights: Flight[] = []; // Array<Flight>

type Passenger = {
  id: number
  name: string
  flightId: number
}
export let passengers: Passenger[] = [];


async function fetchAndRender() {
  // fetch the flights data from the json-server API
  const response = await fetch("http://localhost:3000/flights");
  const flightsData = await response.json();
  // saving the data in state
  flights = flightsData;
  // rendering based on the state
  renderFlights();

  // fetch the flights data from the json-server API
  const passengersResponse = await fetch("http://localhost:3000/passengers");
  const passengersData = await passengersResponse.json();
  // saving the data in state
  passengers = passengersData;
  // rendering based on the state
  renderPassengers();

  const mockResponse = await fetch(
    "https://6621c5cb27fcd16fa6c7e701.mockapi.io/tasks"
  );
  const tasksData = await mockResponse.json();
  console.log(tasksData);

  // const omdbResponse = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=Anyone`)
  // const moviesData = await omdbResponse.json()
  // console.log(moviesData)
}

fetchAndRender();
