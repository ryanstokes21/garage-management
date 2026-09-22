import { loadMaintenance, saveMaintenance, saveVehicles } from './storage.js';
import { renderVehicles, vehicles } from './vehicle.js';

const maintenanceDialog = document.getElementById('maintenance-dialog');
const maintenanceForm = document.getElementById('maintenance-form');

let selectedVehicleId = null;

const maintenanceRecord = loadMaintenance();

class Maintenance {
  constructor({
    vehicleId,
    service,
    date,
    mileage,
    performedBy,
    nextServiceDate,
    nextServiceMileage,
    notes,
  }) {
    this.id = crypto.randomUUID();
    this.vehicleId = vehicleId;
    this.service = service;
    this.date = date;
    this.mileage = Number(mileage);
    this.performedBy = performedBy;
    this.nextServiceDate = nextServiceDate || null;
    this.nextServiceMileage = nextServiceMileage
      ? Number(nextServiceMileage)
      : null;
    this.notes = notes;
  }
}

export function initMaintenance() {
  document
    .getElementById('close-maintenance-form-btn')
    ?.addEventListener('click', closeMaintenanceDialog);

  document
    .getElementById('submit-maintenance-form-btn')
    .addEventListener('click', submitMaintenanceForm);

  document
    .getElementById('empty-add-maintenance-btn')
    .addEventListener('click', () => {
      openMaintenanceDialog(selectedVehicleId);
    });

  document
    .getElementById('add-maintenance-btn-view-tab')
    .addEventListener('click', () => {
      openMaintenanceDialog(selectedVehicleId);
    });
}

export function renderMaintenance(vehicleId) {
  selectedVehicleId = vehicleId;

  const maintenanceContainer = document.getElementById('maintenance-container');
  const maintenanceTemplate = document.getElementById(
    'maintenance-card-template',
  );
  const emptyState = document.getElementById('maintenance-empty-state');

  maintenanceContainer.replaceChildren();

  const vehicleMaintenance = maintenanceRecord.filter(
    (record) => record.vehicleId === vehicleId,
  );

  if (vehicleMaintenance.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  vehicleMaintenance.forEach((record) => {
    const card = maintenanceTemplate.content.firstElementChild.cloneNode(true);

    card.querySelector('.maintenance-service').textContent = record.service;

    card.querySelector('.maintenance-date').textContent = record.date;

    card.querySelector('.maintenance-mileage').textContent = record.mileage;

    card.querySelector('.maintenance-performed-by').textContent =
      record.performedBy;

    card.querySelector('.maintenance-next-service-date').textContent =
      record.nextServiceDate;

    card.querySelector('.maintenance-next-service-mileage').textContent =
      record.nextServiceMileage;

    card.querySelector('.maintenance-notes').textContent = record.notes;

    maintenanceContainer.append(card);
  });
}

export function openMaintenanceDialog(vehicleId) {
  selectedVehicleId = vehicleId;
  maintenanceDialog.showModal();
}

function closeMaintenanceDialog() {
  maintenanceDialog.close();
  maintenanceForm.reset();

  selectedVehicleId = null;
}

function submitMaintenanceForm() {
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const mileage = document.getElementById('maintenance-mileage').value;
  const performedBy = document.getElementById('performed').value;
  const nextServiceDate = document.getElementById('next-service-date').value;
  const nextServiceMileage = document.getElementById(
    'next-service-mileage',
  ).value;
  const notes = document.getElementById('maintenance-notes').value;

  if (!validateMaintenanceForm(service, date, mileage)) {
    return;
  }

  const newMaintenance = new Maintenance({
    vehicleId: selectedVehicleId,
    service,
    date,
    mileage,
    performedBy,
    nextServiceDate,
    nextServiceMileage,
    notes,
  });

  maintenanceRecord.push(newMaintenance);

  saveMaintenance(maintenanceRecord);

  updateVehicleMileage(selectedVehicleId, mileage);

  maintenanceForm.reset();
  maintenanceDialog.close();
  renderMaintenance(selectedVehicleId);

  selectedVehicleId = null;
}

function updateVehicleMileage(vehicleId, maintenanceMileage) {
  const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

  if (!vehicle) return;

  const newMileage = Number(maintenanceMileage);

  if (newMileage > vehicle.mileage) {
    vehicle.mileage = newMileage;

    saveVehicles(vehicles);
    renderVehicles();
    document.getElementById('current-mileage').textContent =
      `${vehicle.mileage.toLocaleString()} miles`;
  }
}

function validateMaintenanceForm(service, date, mileage) {
  if (!service.trim() || !date || mileage === '') {
    alert('Please fill out the required maintenance fields.');
    return false;
  }

  if (Number(mileage) < 0) {
    alert('Please enter a valid mileage.');
    return false;
  }

  return true;
}

export function deleteVehicleMaintenance(vehicleId) {
  for (let i = maintenanceRecord.length - 1; i >= 0; i--) {
    if (maintenanceRecord[i].vehicleId === vehicleId) {
      maintenanceRecord.splice(i, 1);
    }
  }

  saveMaintenance(maintenanceRecord);
}
