const maintenanceDialog = document.getElementById('maintenance-dialog');
const maintenanceForm = document.getElementById('maintenance-form');

let selectedVehicleId = null;

class Maintenance {
  constructor(
    vehicleId,
    service,
    date,
    mileage,
    performedBy,
    nextServiceDate,
    nextServiceMileage,
    notes,
  ) {
    this.id = crypto.randomUUID();
    this.vehicleId = vehicleId;
    this.service = service.trim();
    this.date = date;
    this.mileage = Number(mileage);
    this.performedBy = performedBy.trim();
    this.nextServiceDate = nextServiceDate || null;
    this.nextServiceMileage = nextServiceMileage
      ? Number(nextServiceMileage)
      : null;
    this.notes = notes.trim();
  }
}

export function initMaintenance() {
  document
    .getElementById('close-maintenance-form-btn')
    ?.addEventListener('click', closeMaintenanceDialog);
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
