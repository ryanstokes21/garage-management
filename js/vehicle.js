const vehicleDialog = document.getElementById('vehicle-dialog');
const vehicleForm = document.getElementById('vehicle-form');

class Vehicle {
  constructor(year, make, model, trim, mileage) {
    this.id = crypto.randomUUID();
    this.year = Number(year);
    this.make = capitalizeWords(make);
    this.model = capitalizeWords(model);
    this.trim = capitalizeWords(trim);
    this.mileage = Number(mileage);
  }
}

const vehicles = [];
console.log(vehicles);

export function initVehicles() {
  renderVehicles();

  document
    .getElementById('add-vehicle-btn')
    .addEventListener('click', openVehicleDialog);

  document
    .getElementById('close-vehicle-form-btn')
    .addEventListener('click', closeVehicleDialog);

  document
    .getElementById('submit-vehicle-form-btn')
    .addEventListener('click', submitVehicleForm);
}

function renderVehicles() {
  const vehicleContainer = document.getElementById('vehicle-container');
  const vehicleTemplate = document.getElementById('vehicle-card-template');
  const emptyState = document.getElementById('vehicle-empty-state');

  vehicleContainer.replaceChildren();

  if (vehicles.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  vehicles.forEach((vehicle) => {
    const card = vehicleTemplate.content.firstElementChild.cloneNode(true);

    card.querySelector('.vehicle-name').textContent =
      `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

    card.querySelector('.vehicle-trim').textContent = vehicle.trim;

    card.querySelector('.current-mileage').textContent =
      `${vehicle.mileage.toLocaleString()} miles`;

    vehicleContainer.append(card);
  });
}

function openVehicleDialog() {
  vehicleDialog.showModal();
}

function closeVehicleDialog() {
  vehicleForm.reset();
  vehicleDialog.close();
}

function submitVehicleForm() {
  const year = document.getElementById('year').value;
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  const trim = document.getElementById('trim').value;
  const mileage = document.getElementById('mileage').value;

  const newVehicle = new Vehicle(year, make, model, trim, mileage);

  vehicles.push(newVehicle);
  vehicleForm.reset();
  vehicleDialog.close();
  renderVehicles();
}

function capitalizeWords(str) {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
