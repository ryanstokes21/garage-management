import { openMaintenanceDialog } from './maintenance.js';

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

  document
    .getElementById('back-to-vehicles-btn')
    .addEventListener('click', switchView);
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

    const addMaintenanceBtn = card.querySelector('.add-maintenance-btn');

    addMaintenanceBtn.addEventListener('click', () => {
      openMaintenanceDialog(vehicle.id);
    });

    const viewVehicleDetailsBtn = card.querySelector('.view-btn');

    viewVehicleDetailsBtn.addEventListener('click', () => {
      switchView();
      viewVehicleDetails(vehicle.id);
    });

    vehicleContainer.append(card);
  });
}

function switchView() {
  const vehiclesTab = document.getElementById('vehicles-section');
  const detailsTab = document.getElementById('vehicle-details-section');

  if (vehiclesTab.classList.contains('hidden')) {
    vehiclesTab.classList.remove('hidden');
    detailsTab.classList.add('hidden');
  } else {
    vehiclesTab.classList.add('hidden');
    detailsTab.classList.remove('hidden');
  }
}

function viewVehicleDetails(vehicleId) {
  const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

  if (!vehicle) return;

  document.getElementById('selected-vehicle').textContent =
    `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  document.getElementById('selected-vehicle-trim').textContent = vehicle.trim;
  document.getElementById('current-mileage').textContent =
    `${vehicle.mileage.toLocaleString()} miles`;
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
