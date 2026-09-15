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

export function initVehicles() {
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

function openVehicleDialog() {
  vehicleDialog.showModal();
}

function closeVehicleDialog() {
  vehicleForm.reset();
  vehicleDialog.close();
}

function submitVehicleForm() {}

function capitalizeWords(str) {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
