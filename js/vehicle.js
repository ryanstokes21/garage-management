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
}

function capitalizeWords(str) {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
