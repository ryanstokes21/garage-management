import { loadVehicles, saveVehicles } from './storage.js';

const vehicles = loadVehicles();

const vehicleTypeDetails = document.getElementById('vehicleType');
const vehicleNicknameDetails = document.getElementById('vehicleNickname');
const vehicleDetails = document.getElementById('vehicle');
const vehicleMileageDetails = document.getElementById('vehicleMilage');

class vehicle {
  constructor(type, make, model, year, trim, mileage, nickname, notes) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.make = make;
    this.model = model;
    this.year = year;
    this.trim = trim;
    this.mileage = mileage;
    this.nickname = nickname;
    this.notes = notes;
  }
}

export function addVehicleToList(
  type,
  make,
  model,
  year,
  trim,
  mileage,
  nickname,
  notes,
) {
  const newVehicle = new vehicle(
    type,
    make,
    model,
    year,
    trim,
    mileage,
    nickname,
    notes,
  );

  vehicles.push(newVehicle);

  saveVehicles(vehicles);
}

export function renderVehicleCard(content) {
  content.textContent = '';

  for (const vehicle of vehicles) {
    const card = document.createElement('div');
    card.classList.add('card');

    const vehicleType = document.createElement('p');
    vehicleType.classList.add('vehicle-type');
    vehicleType.textContent = vehicle.type;

    const vehicleNickname = document.createElement('p');
    vehicleNickname.classList.add('vehicle-nickname');
    vehicleNickname.textContent = vehicle.nickname;

    const vehicleYearMakeModel = document.createElement('p');
    vehicleYearMakeModel.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

    const vehicleTrim = document.createElement('p');
    vehicleTrim.textContent = vehicle.trim;

    const vehicleMileage = document.createElement('p');
    vehicleMileage.classList.add('vehicle-mileage');
    vehicleMileage.textContent = `${vehicle.mileage} miles`;

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-container');

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('action-btn');
    detailsBtn.setAttribute('data-id', vehicle.id);
    detailsBtn.textContent = 'View';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    actionContainer.append(detailsBtn, deleteBtn);

    card.append(
      vehicleType,
      vehicleNickname,
      vehicleYearMakeModel,
      vehicleTrim,
      vehicleMileage,
      actionContainer,
    );

    content.append(card);

    detailsBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      console.log(vehicle.id === id);

      if (id) {
        vehicleTypeDetails.textContent = vehicle.type;
        vehicleNicknameDetails.textContent = vehicle.nickname;
        vehicleDetails.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
        vehicleMileageDetails.textContent = vehicle.mileage;
      }
      toggleElements();
    });

    deleteBtn.addEventListener('click', () => {
      deleteVehicle(vehicle.id);
      renderVehicleCard(content);
    });
  }
}

function deleteVehicle(id) {
  const index = vehicles.findIndex((vehicle) => vehicle.id === id);

  if (index === -1) return;

  vehicles.splice(index, 1);

  saveVehicles(vehicles);
}

function toggleElements(id) {
  const vehicleContent = document.getElementById('vehicleContent');
  const vehicleDetails = document.getElementById('vehicleDetails');

  if (vehicleDetails.classList.contains('hidden')) {
    vehicleContent.classList.add('hidden');
    vehicleDetails.classList.remove('hidden');
  } else {
    vehicleDetails.classList.add('hidden');
    vehicleContent.classList.remove('hidden');
  }
}

const closeBtn = document.getElementById('closeDetails');

if (closeBtn) closeBtn.addEventListener('click', toggleElements);
