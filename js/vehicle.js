import {
  deleteVehicleMaintenance,
  openMaintenanceDialog,
  renderMaintenance,
} from './maintenance.js';
import { loadVehicles, saveVehicles } from './storage.js';

const vehicleDialog = document.getElementById('vehicle-dialog');
const vehicleForm = document.getElementById('vehicle-form');

let selectedVehicleId = null;

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

export const vehicles = loadVehicles();

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

  document
    .getElementById('delete-vehicle-btn')
    .addEventListener('click', deleteVehicle);
}

export function renderVehicles() {
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
      renderMaintenance(vehicle.id);
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

export function viewVehicleDetails(vehicleId) {
  const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

  if (!vehicle) return;

  selectedVehicleId = vehicle.id;

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

  if (!validateVehicleForm(year, make, model, mileage)) {
    return;
  }

  const newVehicle = new Vehicle(year, make, model, trim, mileage);

  vehicles.push(newVehicle);

  saveVehicles(vehicles);
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

function deleteVehicle() {
  if (!selectedVehicleId) return;

  const confirmed = confirm('Are you sure you want to delete this vehicle?');

  if (!confirmed) return;

  const vehicleIndex = vehicles.findIndex(
    (vehicle) => vehicle.id === selectedVehicleId,
  );

  if (vehicleIndex === -1) return;

  deleteVehicleMaintenance(selectedVehicleId);

  vehicles.splice(vehicleIndex, 1);
  saveVehicles(vehicles);

  selectedVehicleId = null;

  renderVehicles();
  switchView();
}

function validateVehicleForm(year, make, model, mileage) {
  if (!year || !make.trim() || !model.trim() || mileage === '') {
    alert('Please fill out all required vehicle fields.');
    return false;
  }

  if (Number(year) <= 0 || Number(mileage) < 0) {
    alert('Please enter valid year and mileage values.');
    return false;
  }

  return true;
}
