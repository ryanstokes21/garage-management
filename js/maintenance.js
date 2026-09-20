const maintenanceDialog = document.getElementById('maintenance-dialog');
const maintenanceForm = document.getElementById('maintenance-form');

let selectedVehicleId = null;

const maintenanceRecord = [];

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
}

export function renderMaintenance(vehicleId) {
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

    card.querySelector('.maintenance-next-service').textContent =
      `${record.nextServiceMileage} or ${record.nextServiceDate}`;

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
  maintenanceForm.reset();
  maintenanceDialog.close();
  renderMaintenance(selectedVehicleId);

  selectedVehicleId = null;
}
