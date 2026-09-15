const addVehicleBtn = document.getElementById('add-vehicle-btn');
const vehicleDialog = document.getElementById('vehicle-dialog');

export function openVehicleDialog() {
  addVehicleBtn.addEventListener('click', () => {
    console.log('click');
    vehicleDialog.showModal();
  });
}
