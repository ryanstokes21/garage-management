import { addVehicleToList, renderVehicleCard } from './vehicle.js';

const vehicleContent = document.getElementById('vehicleContent');

if (vehicleContent) {
  renderVehicleCard(vehicleContent);
}

const openDialog = document.getElementById('openDialog');
const submitDialog = document.getElementById('submitDialog');
const closeDialog = document.getElementById('closeDialog');
const vehicleDialog = document.getElementById('vehicleDialog');
const vehicleForm = document.getElementById('vehicleForm');

const makeInput = document.getElementById('make');
const modelInput = document.getElementById('model');
const yearInput = document.getElementById('year');
const typeInput = document.getElementById('type');
const trimInput = document.getElementById('trim');
const mileageInput = document.getElementById('mileage');
const nicknameInput = document.getElementById('nickname');
const notesInput = document.getElementById('notes');

if (openDialog) {
  openDialog.addEventListener('click', () => {
    vehicleDialog.showModal();
  });
}

if (closeDialog) {
  closeDialog.addEventListener('click', () => {
    vehicleDialog.close();
    vehicleForm.reset();
  });
}

if (submitDialog) {
  submitDialog.addEventListener('click', () => {
    console.log('click');

    addVehicleToList(
      typeInput.value,
      makeInput.value,
      modelInput.value,
      yearInput.value,
      trimInput.value,
      mileageInput.value,
      nicknameInput.value,
      notesInput.value,
    );

    renderVehicleCard(vehicleContent);
    vehicleForm.reset();
    vehicleDialog.close();
  });
}
